export interface PdfUploadItem {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed' | 'pending';
  fileUrl: string;
  mimeType: string;
  pages: number | null;
  hasEstimate: boolean;
  estimateId: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
