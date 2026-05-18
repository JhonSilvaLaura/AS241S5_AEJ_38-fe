export interface CartoonResult {
  id: string;
  imageName: string;
  cartoonIndex: number;
  taskId: string;
  taskType?: string;
  requestId?: string;
  logId?: string;
  errorCode?: number;
  errorMsg?: string;
  resultUrl?: string;
  taskStatus?: number;
  status: 'pending' | 'completed' | 'failed';
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
