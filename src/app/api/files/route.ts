import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const uploads = await prisma.pdfUpload.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: 'desc' },
      include: {
        estimate: {
          select: { id: true, status: true },
        },
      },
    });

    return NextResponse.json<ApiResponse<PdfUploadItem[]>>({
      success: true,
      data: uploads.map(mapUpload),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch files';
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 500 }
    );
  }
};
