'use client';

import { useCallback, useState } from 'react';
import { FolderOpen, Lock, Shield, Upload, Zap } from 'lucide-react';

import { Button } from '@/src/components/ui/Button';

type FileUploadZoneProps = {
  onFilesUpload: (files: File[]) => void;
  isUploading?: boolean;
  acceptedTypes?: string[];
};

export const FileUploadZone = ({
  onFilesUpload,
  isUploading = false,
  acceptedTypes = ['.pdf'],
}: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragOver(false);
      const files = Array.from(event.dataTransfer.files);
      const validFiles = files.filter((file) =>
        acceptedTypes.some((type) => file.name.toLowerCase().endsWith(type.toLowerCase()))
      );
      if (validFiles.length > 0) {
        onFilesUpload(validFiles);
      }
    },
    [acceptedTypes, onFilesUpload]
  );

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      if (files.length > 0) {
        onFilesUpload(files);
      }
      event.target.value = '';
    },
    [onFilesUpload]
  );

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition ${
          isDragOver ? 'border-black bg-black/5' : 'border-border hover:border-black/40'
        } ${isUploading ? 'pointer-events-none opacity-75' : ''}`}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={isUploading}
        />

        <div className={`flex flex-col items-center gap-4 ${isUploading ? 'opacity-30' : ''}`}>
          <div className={`rounded-full p-4 ${isDragOver ? 'bg-black text-white' : 'bg-muted text-foreground'}`}>
            <Upload className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Drop files here' : 'Upload Inspection Reports'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag and drop your PDF inspection reports here, or click to browse files.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button
              variant="default"
              icon={<FolderOpen className="h-4 w-4" />}
              disabled={isUploading}
            >
              Browse Files
            </Button>
            <span className="text-xs text-muted-foreground">
              Supported formats: {acceptedTypes.join(', ')} • Max size: 10MB per file
            </span>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Upload className="h-4 w-4 animate-bounce" />
              Uploading files...
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <Shield className="h-3 w-3" />
          Secure upload
        </span>
        <span className="flex items-center gap-2">
          <Zap className="h-3 w-3" />
          Fast processing
        </span>
        <span className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          Private & confidential
        </span>
      </div>
    </div>
  );
};
