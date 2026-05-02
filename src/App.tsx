import { useState, useEffect } from 'react';
import { cartoonService, type CartoonResult } from './services/cartoonService';
import { CartoonCard, UploadForm, FilterBar, Modal } from './components';
import { Palette, Heart, CheckCircle, XCircle, Info } from 'lucide-react';

function App() {
  const [cartoons, setCartoons] = useState<CartoonResult[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<CartoonResult[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCartoonId, setSelectedCartoonId] = useState<string | null>(null);

  // Cargar cartoons al iniciar
  useEffect(() => {
    loadCartoons();
  }, []);

  // Filtrar cartoons cuando cambia el filtro o los datos
  useEffect(() => {
    filterCartoons();
  }, [currentFilter, cartoons]);

  const loadCartoons = async () => {
    try {
      const data = await cartoonService.getAllCartoons();
      setCartoons(data);
    } catch (error) {
      showNotification('Error al cargar los cartoons', 'error');
    }
  };

  const filterCartoons = () => {
    if (currentFilter === 'all') {
      setFilteredCartoons(cartoons);
    } else {
      const filtered = cartoons.filter((c) => c.status === currentFilter);
      setFilteredCartoons(filtered);
    }
  };

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleGenerate = async (file: File, index: number) => {
    setIsLoading(true);
    try {
      const result = await cartoonService.generateCartoon(file, index);
      setCartoons([result, ...cartoons]);
      showNotification(
        '¡Cartoon generado! Consulta el estado en unos segundos.',
        'success'
      );
    } catch (error) {
      showNotification('Error al generar cartoon', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (file: File, index: number) => {
    if (!selectedCartoonId) return;

    setIsLoading(true);
    try {
      const result = await cartoonService.updateCartoon(
        selectedCartoonId,
        file,
        index
      );
      setCartoons(
        cartoons.map((c) => (c.id === selectedCartoonId ? result : c))
      );
      showNotification('¡Cartoon actualizado exitosamente!', 'success');
      setIsUpdateModalOpen(false);
      setSelectedCartoonId(null);
    } catch (error) {
      showNotification('Error al actualizar cartoon', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este cartoon?')) return;

    try {
      await cartoonService.deleteCartoon(id);
      setCartoons(cartoons.filter((c) => c.id !== id));
      showNotification('Cartoon eliminado exitosamente', 'success');
    } catch (error) {
      showNotification('Error al eliminar cartoon', 'error');
    }
  };

  const handleCheckStatus = async (taskId: string) => {
    try {
      const result = await cartoonService.checkTaskResult(taskId);
      setCartoons(cartoons.map((c) => (c.taskId === taskId ? result : c)));
      if (result.status === 'completed') {
        showNotification('¡Cartoon completado!', 'success');
      } else if (result.status === 'failed') {
        showNotification('El cartoon falló al procesarse', 'error');
      } else {
        showNotification('Aún procesando...', 'info');
      }
    } catch (error) {
      showNotification('Error al consultar estado', 'error');
    }
  };

  const openUpdateModal = (id: string) => {
    setSelectedCartoonId(id);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md py-8 px-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
            <Palette className="w-10 h-10 text-indigo-600" />
            AI Cartoon Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Transforma tus imágenes en increíbles cartoons con IA
          </p>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-24 right-5 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 max-w-md animate-slide-in ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-6 h-6" />
          ) : notification.type === 'error' ? (
            <XCircle className="w-6 h-6" />
          ) : (
            <Info className="w-6 h-6" />
          )}
          <span className="flex-1">{notification.message}</span>
          <button
            className="bg-white/20 hover:bg-white/30 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
            onClick={() => setNotification(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Upload Section */}
        <section className="mb-12">
          <UploadForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Cartoons List Section */}
        <section>
          <FilterBar
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
            totalCount={filteredCartoons.length}
          />

          {filteredCartoons.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <div className="flex justify-center mb-4">
                <Info className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                No hay cartoons para mostrar
              </h3>
              <p className="text-gray-600 text-lg">
                {currentFilter === 'all'
                  ? 'Genera tu primer cartoon usando el formulario de arriba'
                  : `No hay cartoons con estado "${currentFilter}"`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCartoons.map((cartoon) => (
                <CartoonCard
                  key={cartoon.id}
                  cartoon={cartoon}
                  onUpdate={openUpdateModal}
                  onDelete={handleDelete}
                  onCheckStatus={handleCheckStatus}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCartoonId(null);
        }}
        title="Actualizar Cartoon"
      >
        <UploadForm
          onSubmit={handleUpdate}
          isLoading={isLoading}
          isUpdate={true}
        />
      </Modal>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md py-6 px-4 text-center text-gray-600 mt-12">
        <p className="flex items-center justify-center gap-2">
          Desarrollado con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> usando React + Spring Boot + MongoDB | AI Cartoon Generator API
        </p>
      </footer>
    </div>
  );
}

export default App;
