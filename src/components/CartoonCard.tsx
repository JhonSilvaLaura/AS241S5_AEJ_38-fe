import { useState } from 'react';
import { type CartoonResult } from '../services/cartoonService';
import { Image, CheckCircle, Clock, XCircle, ChevronDown, ChevronRight, RefreshCw, Edit, Trash2, AlertTriangle, Download } from 'lucide-react';

interface CartoonCardProps {
  cartoon: CartoonResult;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onCheckStatus: (taskId: string) => void;
}

export const CartoonCard = ({ cartoon, onUpdate, onDelete, onCheckStatus }: CartoonCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDownload = async () => {
    if (!cartoon.resultUrl) return;

    try {
      // Usar el endpoint proxy del backend para evitar CORS
      const downloadUrl = `http://localhost:8085/api/cartoon/download?imageUrl=${encodeURIComponent(cartoon.resultUrl)}`;
      
      // Fetch the image through the backend proxy
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Error al descargar la imagen');
      
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${cartoon.imageName.replace(/\.[^/.]+$/, '')}_cartoon.png`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
      alert('Error al descargar la imagen. Por favor, intenta de nuevo.');
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Image className="w-6 h-6 text-indigo-600 flex-shrink-0" />
          <h3 className="text-lg font-bold truncate">{cartoon.imageName}</h3>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-bold border-2 flex items-center gap-1 whitespace-nowrap ${getStatusStyles(
            cartoon.status
          )}`}
        >
          {getStatusIcon(cartoon.status)}
          {cartoon.status.toUpperCase()}
        </span>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-600 font-semibold">Estilo:</span>
            <span className="font-bold text-gray-900">Cartoon #{cartoon.cartoonIndex}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-600 font-semibold">Fecha:</span>
            <span className="font-bold text-gray-900">
              {new Date(cartoon.createdAt).toLocaleDateString('es-ES')}
            </span>
          </div>
        </div>

        {/* Result Image */}
        {cartoon.resultUrl && (
          <div className="my-4 rounded-lg overflow-hidden shadow-md relative group">
            <img
              src={cartoon.resultUrl}
              alt={cartoon.imageName}
              className="w-full h-auto"
            />
            {/* Overlay con botón de descarga */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button
                onClick={handleDownload}
                className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-105 transition-transform"
              >
                <Download className="w-5 h-5" />
                Descargar Imagen
              </button>
            </div>
          </div>
        )}

        {/* Pending Message */}
        {cartoon.status === 'pending' && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-center gap-3 my-4">
            <Clock className="w-6 h-6 text-yellow-600 animate-pulse" />
            <p className="text-yellow-900">
              Procesando imagen... Consulta el estado para ver el resultado.
            </p>
          </div>
        )}

        {/* Error Message */}
        {cartoon.errorMsg && (
          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 flex items-center gap-3 my-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <p className="text-red-900">{cartoon.errorMsg}</p>
          </div>
        )}

        {/* Details Toggle */}
        <button
          className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-gray-900 transition-colors flex items-center justify-center gap-2"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? (
            <>
              <ChevronDown className="w-5 h-5" />
              Ocultar detalles
            </>
          ) : (
            <>
              <ChevronRight className="w-5 h-5" />
              Ver detalles
            </>
          )}
        </button>

        {/* Details Section */}
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-semibold text-gray-600">ID:</span>
              <span className="text-gray-900 font-mono text-sm break-all">
                {cartoon.id}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-semibold text-gray-600">Task ID:</span>
              <span className="text-gray-900 font-mono text-sm break-all">
                {cartoon.taskId}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="font-semibold text-gray-600">Request ID:</span>
              <span className="text-gray-900 font-mono text-sm break-all">
                {cartoon.requestId}
              </span>
            </div>
            {cartoon.updatedAt && (
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Actualizado:</span>
                <span className="text-gray-900 font-mono text-sm">
                  {new Date(cartoon.updatedAt).toLocaleString('es-ES')}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-50 flex flex-wrap gap-3">
        {cartoon.status === 'completed' && cartoon.resultUrl && (
          <button
            className="flex-1 min-w-[120px] px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5" />
            Descargar
          </button>
        )}
        {cartoon.status === 'pending' && (
          <button
            className="flex-1 min-w-[120px] px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            onClick={() => onCheckStatus(cartoon.taskId)}
          >
            <RefreshCw className="w-5 h-5" />
            Consultar Estado
          </button>
        )}
        <button
          className="flex-1 min-w-[120px] px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => onUpdate(cartoon.id)}
        >
          <Edit className="w-5 h-5" />
          Actualizar
        </button>
        <button
          className="flex-1 min-w-[120px] px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={() => onDelete(cartoon.id)}
        >
          <Trash2 className="w-5 h-5" />
          Eliminar
        </button>
      </div>
    </div>
  );
};
