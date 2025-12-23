'use client';

import { CheckCircle2, Clock, Download, Eye, FileText, Loader2, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import type { PdfUploadItem } from '@/types/files';

type WaitPeriod = {
  remainingMs: number;
};

type FileItemProps = {
  file: PdfUploadItem;
  viewMode: 'grid' | 'list';
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onView: () => void;
  onDelete: () => void;
  onDownload: () => void;
  onEstimate?: () => void;
  waitPeriod?: WaitPeriod;
};

const formatFileSize = (bytes: number) => {
  if (!bytes) {
    return '0 Bytes';
  }
  const units = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / Math.pow(1024, index);
  return `${size.toFixed(2)} ${units[index]}`;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const formatRemaining = (remainingMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`;
};

const statusStyles: Record<PdfUploadItem['status'], string> = {
  completed: 'bg-emerald-100 text-emerald-700',
  processing: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-muted text-muted-foreground',
};

const statusIcon: Record<PdfUploadItem['status'], JSX.Element> = {
  completed: <CheckCircle2 className="h-3 w-3" />,
  processing: <Loader2 className="h-3 w-3 animate-spin" />,
  failed: <Clock className="h-3 w-3" />,
  pending: <Clock className="h-3 w-3" />,
};

export const FileItem = ({
  file,
  viewMode,
  isSelected,
  onSelect,
  onView,
  onDelete,
  onDownload,
  onEstimate,
  waitPeriod,
}: FileItemProps) => {
  const isCompleted = file.status === 'completed';
  const waitLabel = waitPeriod ? formatRemaining(waitPeriod.remainingMs) : null;
  const statusBadge = (
    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs ${statusStyles[file.status]}`}>
      {statusIcon[file.status]}
      <span className="capitalize">{file.status}</span>
    </div>
  );

  if (viewMode === 'grid') {
    return (
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(event) => onSelect(event.target.checked)}
            className="mt-1 rounded border-border"
          />
          {waitLabel ? (
            <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
              <Clock className="h-3 w-3" />
              <span>{waitLabel}</span>
            </div>
          ) : (
            statusBadge
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5">
            <FileText className="h-5 w-5 text-black" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">Uploaded {formatDate(file.uploadDate)}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<Eye className="h-4 w-4" />}
            onClick={onView}
            disabled={!isCompleted}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={<Download className="h-4 w-4" />}
            onClick={onDownload}
            disabled={!isCompleted}
          />
          <Button
            size="sm"
            variant="outline"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={onDelete}
          />
          {onEstimate && (
            <Button
              size="sm"
              variant="default"
              icon={<FileText className="h-4 w-4" />}
              onClick={onEstimate}
              disabled={!!waitPeriod || file.status === 'processing'}
            >
              Estimate
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
      <div className="grid grid-cols-[28px_1fr_140px_120px_120px_140px] items-center gap-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(event) => onSelect(event.target.checked)}
          className="rounded border-border"
        />
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-black/5">
            <FileText className="h-4 w-4 text-black" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
          </div>
        </div>
        <div className="flex justify-center">
          {waitLabel ? (
            <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700">
              <Clock className="h-3 w-3" />
              <span>{waitLabel}</span>
            </div>
          ) : (
            statusBadge
          )}
        </div>
        <div className="text-center text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
        <div className="text-center text-xs text-muted-foreground">{formatDate(file.uploadDate)}</div>
        <div className="flex items-center justify-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            icon={<Eye className="h-4 w-4" />}
            onClick={onView}
            disabled={!isCompleted}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<Download className="h-4 w-4" />}
            onClick={onDownload}
            disabled={!isCompleted}
          />
          <Button size="sm" variant="ghost" icon={<Trash2 className="h-4 w-4" />} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};
