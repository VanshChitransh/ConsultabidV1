'use client';

import { ArrowDown, ArrowUp, Download, Grid3X3, List, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FileItem } from '@/src/components/files/FileItem';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import type { PdfUploadItem } from '@/src/types/files';

type WaitPeriod = {
  remainingMs: number;
};

type FileListProps = {
  files: PdfUploadItem[];
  onFileDelete: (id: string) => void;
  onFileView: (file: PdfUploadItem) => void;
  onFileDownload: (file: PdfUploadItem) => void;
  onBulkDelete: (ids: string[]) => void;
  onBulkDownload: (ids: string[]) => void;
  onEstimate?: (file: PdfUploadItem) => void;
  fileWaitPeriods?: Record<string, WaitPeriod>;
};

const sortOptions = [
  { value: 'date', label: 'Upload Date' },
  { value: 'name', label: 'File Name' },
  { value: 'size', label: 'File Size' },
  { value: 'status', label: 'Status' },
];

export const FileList = ({
  files,
  onFileDelete,
  onFileView,
  onFileDownload,
  onBulkDelete,
  onBulkDownload,
  onEstimate,
  fileWaitPeriods = {},
}: FileListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedFiles = useMemo(() => {
    const filtered = files.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      let aValue: string | number | Date = '';
      let bValue: string | number | Date = '';

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'date':
        default:
          aValue = new Date(a.uploadDate);
          bValue = new Date(b.uploadDate);
          break;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [files, searchQuery, sortBy, sortOrder]);

  const handleSelectAll = () => {
    if (selectedFiles.size === filteredAndSortedFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredAndSortedFiles.map((file) => file.id)));
    }
  };

  const handleFileSelect = (fileId: string, isSelected: boolean) => {
    const nextSelected = new Set(selectedFiles);
    if (isSelected) {
      nextSelected.add(fileId);
    } else {
      nextSelected.delete(fileId);
    }
    setSelectedFiles(nextSelected);
  };

  const handleBulkAction = (action: 'delete' | 'download') => {
    const ids = Array.from(selectedFiles);
    if (action === 'delete') {
      onBulkDelete(ids);
    } else {
      onBulkDownload(ids);
    }
    setSelectedFiles(new Set());
  };

  if (files.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">No files uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-md flex-1">
          <Input
            type="search"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select options={sortOptions} value={sortBy} onChange={setSortBy} />
          <Button
            variant="outline"
            size="sm"
            icon={sortOrder === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            icon={<List className="h-4 w-4" />}
            onClick={() => setViewMode('list')}
          />
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            icon={<Grid3X3 className="h-4 w-4" />}
            onClick={() => setViewMode('grid')}
          />
        </div>
      </div>

      {selectedFiles.size > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <span className="text-sm font-medium text-foreground">
            {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="h-4 w-4" />}
              onClick={() => handleBulkAction('download')}
            >
              Download
            </Button>
            <Button
              variant="destructive"
              size="sm"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="hidden grid-cols-[28px_1fr_140px_120px_120px_140px] gap-3 rounded-lg bg-muted px-4 py-3 text-xs font-semibold text-muted-foreground lg:grid">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={selectedFiles.size === filteredAndSortedFiles.length && filteredAndSortedFiles.length > 0}
              onChange={handleSelectAll}
              className="rounded border-border"
            />
          </div>
          <div>File Name</div>
          <div className="text-center">Status</div>
          <div className="text-center">Size</div>
          <div className="text-center">Upload Date</div>
          <div className="text-center">Actions</div>
        </div>
      )}

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' : 'space-y-2'}>
        {filteredAndSortedFiles.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            viewMode={viewMode}
            isSelected={selectedFiles.has(file.id)}
            onSelect={(selected) => handleFileSelect(file.id, selected)}
            onView={() => onFileView(file)}
            onDelete={() => onFileDelete(file.id)}
            onDownload={() => onFileDownload(file)}
            onEstimate={onEstimate ? () => onEstimate(file) : undefined}
            waitPeriod={fileWaitPeriods[file.id]}
          />
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Showing {filteredAndSortedFiles.length} of {files.length} files
      </div>
    </div>
  );
};
