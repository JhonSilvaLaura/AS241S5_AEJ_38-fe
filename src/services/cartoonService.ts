import type { CartoonResult } from '../types/cartoon';

// Usar ruta relativa para que Vite proxy maneje la petición
const API_BASE_URL = '/api/cartoon';

export const cartoonService = {
  generateCartoon: async (file: File, index: number): Promise<CartoonResult> => {
    const formData = new FormData();
    formData.append('image', file);  // Cambié 'file' por 'image'
    formData.append('index', index.toString());

    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Error al generar cartoon');
    return response.json();
  },

  getAllCartoons: async (): Promise<CartoonResult[]> => {
    const response = await fetch(`${API_BASE_URL}/all`);
    if (!response.ok) throw new Error('Error al obtener cartoons');
    return response.json();
  },

  getCartoonById: async (id: string): Promise<CartoonResult> => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Error al obtener cartoon');
    return response.json();
  },

  checkTaskResult: async (taskId: string): Promise<CartoonResult> => {
    const response = await fetch(`${API_BASE_URL}/task/${taskId}`);
    if (!response.ok) throw new Error('Error al consultar tarea');
    return response.json();
  },

  getByStatus: async (status: string): Promise<CartoonResult[]> => {
    const response = await fetch(`${API_BASE_URL}/status/${status}`);
    if (!response.ok) throw new Error('Error al filtrar cartoons');
    return response.json();
  },

  updateCartoon: async (id: string, file: File, index: number): Promise<CartoonResult> => {
    const formData = new FormData();
    formData.append('image', file);  // Cambié 'file' por 'image'
    formData.append('index', index.toString());

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) throw new Error('Error al actualizar cartoon');
    return response.json();
  },

  deleteCartoon: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar cartoon');
  },
};
