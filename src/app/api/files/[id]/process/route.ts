import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { triggerEstimate } from '@/src/lib/ai-engine-client';
import { prisma } from '@/src/lib/prisma';
import type { ApiResponse, PdfUploadItem } from '@/src/types/files';

export const runtime = 'nodejs';

const mapUpload = (upload: {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: Date;
  pageCount: number | null;
  estimate: { id: string; status: string } | null;
}): PdfUploadItem => ({
  id: upload.id,
  name: upload.fileName,
  size: upload.fileSize,
  uploadDate: upload.uploadedAt.toISOString(),
  status: upload.estimate?.status === 'processing'
    ? 'processing'
    : upload.estimate?.status === 'failed'
      ? 'failed'
      : upload.estimate
        ? 'completed'
        : 'pending',
  fileUrl: upload.fileUrl,
  mimeType: upload.mimeType,
  pages: upload.pageCount,
  hasEstimate: Boolean(upload.estimate?.id),
  estimateId: upload.estimate?.id ?? null,
});

export const POST = async (_request: Request, { params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const upload = await prisma.pdfUpload.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      estimate: {
        select: { id: true, status: true },
      },
    },
  });

  if (!upload) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'File not found' },
      { status: 404 }
    );
  }

  const now = new Date();

  const estimate = await prisma.estimate.upsert({
    where: { sourcePdfId: upload.id },
    update: {
      status: 'processing',
      processingStartedAt: now,
      updatedAt: now,
    },
    create: {
      userId: session.user.id,
      sourcePdfId: upload.id,
      fileName: `${upload.fileName.replace('.pdf', '')}-estimate.json`,
      fileUrl: '',
      fileSize: 0,
      mimeType: 'application/json',
      status: 'processing',
      processingStartedAt: now,
    },
  });

  try {
    const aiResponse = await triggerEstimate({ pdfId: upload.id, r2Url: upload.fileUrl });

    const updatedEstimate = await prisma.estimate.update({
      where: { id: estimate.id },
      data: {
        status: 'completed',
        fileUrl: aiResponse.estimateUrl,
        totalAmount: aiResponse.summary?.total_estimate ?? null,
        updatedAt: new Date(),
      },
    });

    await prisma.pdfUpload.update({
      where: { id: upload.id },
      data: {
        isProcessed: true,
        processedAt: new Date(),
      },
    });

    return NextResponse.json<ApiResponse<{ estimateId: string; upload: PdfUploadItem }>>({
      success: true,
      data: {
        estimateId: updatedEstimate.id,
        upload: mapUpload({
          ...upload,
          estimate: { id: updatedEstimate.id, status: updatedEstimate.status },
        }),
      },
    });
  } catch (error) {
    await prisma.estimate.update({
      where: { id: estimate.id },
      data: {
        status: 'failed',
        updatedAt: new Date(),
      },
    });

    const message = error instanceof Error ? error.message : 'Failed to process estimate';
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 500 }
    );
  }
};
