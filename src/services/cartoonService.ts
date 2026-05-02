const API_BASE_URL = 'http://localhost:8085/api/cartoon';

export interface CartoonResult {
  id: string;
  imageName: string;
  cartoonIndex: number;
  taskId: string;
  taskType: string;
  requestId: string;
  logId: string;
  errorCode: number;
  errorMsg: string | null;
  resultUrl: string | null;
  taskStatus: number | null;
  status: 'pending' | 'completed' | 'failed';
  deleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export const cartoonService = {
  // CREATE - Generar cartoon
  async generateCartoon(image: File, index: number): Promise<CartoonResult> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('index', index.toString());

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al generar cartoon');
    }

    return response.json();
  },

  // READ - Obtener todos los cartoons
  async getAllCartoons(): Promise<CartoonResult[]> {
    const response = await fetch(`${API_BASE_URL}/all`);

    if (!response.ok) {
      throw new Error('Error al obtener cartoons');
    }

    return response.json();
  },

  // READ - Obtener cartoon por ID
  async getCartoonById(id: string): Promise<CartoonResult> {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('Error al obtener cartoon');
    }

    return response.json();
  },

  // READ - Consultar resultado de tarea
  async checkTaskResult(taskId: string): Promise<CartoonResult> {
    const response = await fetch(`${API_BASE_URL}/task/${taskId}`);

    if (!response.ok) {
      throw new Error('Error al consultar tarea');
    }

    return response.json();
  },

  // READ - Filtrar por estado
  async getCartoonsByStatus(status: string): Promise<CartoonResult[]> {
    const response = await fetch(`${API_BASE_URL}/status/${status}`);

    if (!response.ok) {
      throw new Error('Error al filtrar cartoons');
    }

    return response.json();
  },

  // UPDATE - Actualizar cartoon
  async updateCartoon(id: string, image: File, index: number): Promise<CartoonResult> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('index', index.toString());

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error al actualizar cartoon');
    }

    return response.json();
  },

  // DELETE - Eliminar cartoon (borrado lógico)
  async deleteCartoon(id: string): Promise<CartoonResult> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar cartoon');
    }

    return response.json();
  },
};