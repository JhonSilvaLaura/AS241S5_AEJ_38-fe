export interface CartoonResult {
  id: string;
  originalImageUrl: string;
  cartoonImageUrl: string;
  imageName?: string;
  resultUrl?: string;
  index: number;
  cartoonIndex?: number;
  status: 'processing' | 'completed' | 'failed' | 'pending' | 'generated';
  taskId?: string;
  errorMsg?: string;
  createdAt: string;
  updatedAt: string;
}