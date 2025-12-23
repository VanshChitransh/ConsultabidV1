import { randomUUID } from 'crypto';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/src/lib/prisma';
import { r2BucketName, r2Client, r2PublicUrl } from '@/src/lib/r2';
import type { ApiResponse, PdfUploadItem } from '@/src/types/files';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 10 * 1024 * 1024;

const normalizePublicUrl = (value: string) => value.replace(/\/$/, '');

const mapUpload = (upload: {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: Date;
  pageCount: number | null;
  estimate: { id: string } | null;
}): PdfUploadItem => ({
  id: upload.id,
  name: upload.fileName,
  size: upload.fileSize,
  uploadDate: upload.uploadedAt.toISOString(),
  status: 'completed',
  fileUrl: upload.fileUrl,
  mimeType: upload.mimeType,
  pages: upload.pageCount,
  hasEstimate: Boolean(upload.estimate?.id),
  estimateId: upload.estimate?.id ?? null,
});

export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const files = formData.getAll('files');
  const fallbackFile = formData.get('file');
  const incomingFiles = (files.length ? files : fallbackFile ? [fallbackFile] : []).filter(
    (file): file is File => file instanceof File
  );

  if (incomingFiles.length === 0) {
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: 'No files provided' },
      { status: 400 }
    );
  }

  const publicUrlBase = normalizePublicUrl(r2PublicUrl);

  try {
    const createdUploads = await Promise.all(
      incomingFiles.map(async (file) => {
        if (!file.name.toLowerCase().endsWith('.pdf')) {
          throw new Error('Only PDF files are supported');
        }
        if (file.size > MAX_FILE_BYTES) {
          throw new Error('File exceeds 10MB size limit');
        }

        const fileExtension = file.name.split('.').pop() ?? 'pdf';
        const fileKey = `uploads/${session.user.id}/${randomUUID()}.${fileExtension}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        await r2Client.send(
          new PutObjectCommand({
            Bucket: r2BucketName,
            Key: fileKey,
            Body: buffer,
            ContentType: file.type || 'application/pdf',
            ContentDisposition: `inline; filename="${file.name}"`,
          })
        );

        const upload = await prisma.pdfUpload.create({
          data: {
            userId: session.user.id,
            fileName: file.name,
            fileUrl: `${publicUrlBase}/${fileKey}`,
            fileSize: file.size,
            mimeType: file.type || 'application/pdf',
            isProcessed: false,
            pageCount: null,
          },
          include: {
            estimate: {
              select: { id: true },
            },
          },
        });

        return mapUpload(upload);
      })
    );

    return NextResponse.json<ApiResponse<PdfUploadItem[]>>({
      success: true,
      data: createdUploads,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to upload file';
    return NextResponse.json<ApiResponse<never>>(
      { success: false, error: message },
      { status: 400 }
    );
  }
};
