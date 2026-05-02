import { useState, useRef } from 'react';
import { Upload, Sparkles, Edit, Loader2 } from 'lucide-react';

interface UploadFormProps {
  onSubmit: (file: File, index: number) => void;
  isLoading: boolean;
  isUpdate?: boolean;
}

export const UploadForm = ({ onSubmit, isLoading, isUpdate = false }: UploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cartoonIndex, setCartoonIndex] = useState<number>(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile, cartoonIndex);
      setSelectedFile(null);
      setPreviewUrl(null);
      setCartoonIndex(1);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
        {isUpdate ? (
          <>
            <Edit className="w-8 h-8 text-indigo-600" />
            Actualizar Cartoon
          </>
        ) : (
          <>
            <Sparkles className="w-8 h-8 text-indigo-600" />
            Generar Nuevo Cartoon
          </>
        )}
      </h2>

      {/* Drop Zone */}
      <div
        className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 mb-6 ${
          selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 bg-gray-50 hover:border-indigo-500 hover:bg-indigo-50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-xs max-h-80 rounded-lg shadow-md"
            />
            <p className="font-semibold text-gray-900">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-16 h-16 text-gray-400" />
            <p className="text-xl font-semibold text-gray-900">
              Arrastra una imagen aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-600">
              Formatos: JPEG, PNG, BMP, WEBP
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/bmp,image/webp"
          onChange={handleFileChange}
          className="hidden"
          required
        />
      </div>

      {/* Style Selector */}
      <div className="mb-6">
        <label className="block font-semibold mb-3 text-lg text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Estilo de Cartoon:
        </label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <button
              key={index}
              type="button"
              className={`py-3 px-4 border-2 rounded-lg font-semibold transition-all duration-300 ${
                cartoonIndex === index
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg scale-105'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-500 hover:bg-indigo-50'
              }`}
              onClick={() => setCartoonIndex(index)}
            >
              Estilo {index}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
        disabled={!selectedFile || isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            {isUpdate ? 'Actualizando...' : 'Generando...'}
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            {isUpdate ? 'Actualizar Cartoon' : 'Generar Cartoon'}
          </>
        )}
      </button>
    </form>
  );
};
