'use client';

import { useCallback, useEffect, useState } from 'react';

import { FileList } from '@/src/components/files/FileList';
import { FileUploadZone } from '@/src/components/files/FileUploadZone';
import type { ApiResponse, PdfUploadItem } from '@/src/types/files';

const fetchFiles = async () => {
  const response = await fetch('/api/files', { credentials: 'include' });
  const payload = (await response.json()) as ApiResponse<PdfUploadItem[]>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.error || 'Failed to load files');
  }
  return payload.data ?? [];
};

export default function FilesPage() {
  const [files, setFiles] = useState<PdfUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchFiles()
      .then((data) => {
        if (isMounted) {
          setFiles(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load files');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpload = useCallback(async (incomingFiles: File[]) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      incomingFiles.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const payload = (await response.json()) as ApiResponse<PdfUploadItem[]>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Upload failed');
      }

      setFiles((prev) => [...(payload.data ?? []), ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleFileView = useCallback((file: PdfUploadItem) => {
    window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
  }, []);

  const handleFileDownload = useCallback((file: PdfUploadItem) => {
    window.open(file.fileUrl, '_blank', 'noopener,noreferrer');
  }, []);

  const handleFileDelete = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const handleBulkDelete = useCallback((ids: string[]) => {
    setFiles((prev) => prev.filter((file) => !ids.includes(file.id)));
  }, []);

  const handleBulkDownload = useCallback((ids: string[]) => {
    files
      .filter((file) => ids.includes(file.id))
      .forEach((file) => window.open(file.fileUrl, '_blank', 'noopener,noreferrer'));
  }, [files]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Files</h1>
        <p className="text-sm text-muted-foreground">
          Upload inspection reports and manage your generated estimates.
        </p>
      </header>

      <FileUploadZone onFilesUpload={handleUpload} isUploading={isUploading} />

      {error && <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</div>}

      <FileList
        files={files}
        onFileDelete={handleFileDelete}
        onFileView={handleFileView}
        onFileDownload={handleFileDownload}
        onBulkDelete={handleBulkDelete}
        onBulkDownload={handleBulkDownload}
      />
    </div>
  );
}
