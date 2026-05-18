import { useState, useEffect } from 'react';
import { 
  FileText, 
  Palette, 
  Filter, 
  Loader2, 
  AlertCircle, 
  Trash2, 
  Edit, 
  Globe, 
  Hash,
  Calendar,
  X,
  CheckCircle,
  XCircle,
  Info,
  Sparkles,
  Download
} from 'lucide-react';
import { articleService } from './services/articleService';
import { cartoonService } from './services/cartoonService';
import type { ArticleSummary, ArticleRequest } from './types/article';
import type { CartoonResult } from './types/cartoon';
import './App.css';

type Tab = 'articles' | 'cartoons';

function App() {
  // Tab state
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  
  // Articles state
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleSummary[]>([]);
  const [articleFilter, setArticleFilter] = useState<string>('all');
  const [articleFormData, setArticleFormData] = useState<ArticleRequest>({
    url: '',
    lang: 'es',
    length: 3,
  });
  const [editingArticle, setEditingArticle] = useState<ArticleSummary | null>(null);
  const [editFormData, setEditFormData] = useState<ArticleRequest>({
    url: '',
    lang: 'es',
    length: 3,
  });

  // Cartoons state
  const [cartoons, setCartoons] = useState<CartoonResult[]>([]);
  const [filteredCartoons, setFilteredCartoons] = useState<CartoonResult[]>([]);
  const [cartoonFilter, setCartoonFilter] = useState<string>('all');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cartoonIndex, setCartoonIndex] = useState<number>(1);
  const [updateCartoonIndex, setUpdateCartoonIndex] = useState<number>(1);
  const [selectedCartoonId, setSelectedCartoonId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Common state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Load data on mount
  useEffect(() => {
    if (activeTab === 'articles') {
      loadArticles();
    } else {
      loadCartoons();
    }
  }, [activeTab]);

  // Apply filters
  useEffect(() => {
    if (activeTab === 'articles') {
      applyArticleFilter(articleFilter);
    } else {
      applyCartoonFilter(cartoonFilter);
    }
  }, [articles, cartoons, articleFilter, cartoonFilter, activeTab]);

  // Articles functions
  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getAll();
      setArticles(data);
    } catch (err) {
      console.error('Error al cargar artículos:', err);
      setError('Error al cargar los artículos. Verifica que el backend esté corriendo.');
      setArticles([]); // Establecer array vacío para evitar errores
    } finally {
      setLoading(false);
    }
  };

  const applyArticleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredArticles(articles);
    } else if (filter === 'pending' || filter === 'generated' || filter === 'failed') {
      setFilteredArticles(articles.filter(a => a.status === filter));
    } else if (filter === 'es' || filter === 'en') {
      setFilteredArticles(articles.filter(a => a.language === filter));
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!articleFormData.url.trim()) {
      showNotification('Por favor ingresa una URL válida', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await articleService.create(articleFormData);
      
      setArticleFormData({
        url: '',
        lang: 'es',
        length: 3,
      });
      
      await loadArticles();
      showNotification('¡Resumen generado exitosamente!', 'success');
    } catch (err) {
      showNotification('Error al crear el resumen', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleArticleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingArticle || !editFormData.url.trim()) {
      showNotification('Por favor ingresa una URL válida', 'error');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await articleService.update(editingArticle.id!, editFormData);
      setEditingArticle(null);
      await loadArticles();
      showNotification('¡Artículo actualizado exitosamente!', 'success');
    } catch (err) {
      showNotification('Error al actualizar el artículo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleArticleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;

    try {
      setLoading(true);
      setError(null);
      await articleService.delete(id);
      await loadArticles();
      showNotification('Artículo eliminado exitosamente', 'success');
    } catch (err) {
      showNotification('Error al eliminar el artículo', 'error');
    } finally {
      setLoading(false);
    }
  };

  const openArticleEditModal = (article: ArticleSummary) => {
    setEditingArticle(article);
    setEditFormData({
      url: article.url,
      lang: article.language,
      length: article.length,
    });
  };

  // Cartoons functions
  const loadCartoons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cartoonService.getAllCartoons();
      setCartoons(data);
    } catch (err) {
      console.error('Error al cargar cartoons:', err);
      showNotification('Error al cargar los cartoons. Verifica que el backend esté corriendo.', 'error');
      setCartoons([]); // Establecer array vacío para evitar errores
    } finally {
      setLoading(false);
    }
  };

  const applyCartoonFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredCartoons(cartoons);
    } else {
      setFilteredCartoons(cartoons.filter(c => c.status === filter));
    }
  };

  const handleCartoonGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      showNotification('Por favor selecciona una imagen', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = await cartoonService.generateCartoon(selectedFile, cartoonIndex);
      setCartoons([result, ...cartoons]);
      setSelectedFile(null);
      setPreviewUrl(null);
      showNotification('¡Cartoon generado! Consulta el estado en unos segundos.', 'success');
    } catch (error) {
      showNotification('Error al generar cartoon', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    } else {
      showNotification('Por favor arrastra una imagen válida', 'error');
    }
  };

  const handleCartoonUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCartoonId || !selectedFile) return;

    setLoading(true);
    try {
      const result = await cartoonService.updateCartoon(selectedCartoonId, selectedFile, updateCartoonIndex);
      setCartoons(cartoons.map(c => c.id === selectedCartoonId ? result : c));
      showNotification('¡Cartoon actualizado exitosamente!', 'success');
      setIsUpdateModalOpen(false);
      setSelectedCartoonId(null);
      setSelectedFile(null);
      setUpdateCartoonIndex(1);
    } catch (error) {
      showNotification('Error al actualizar cartoon', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCartoonDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este cartoon?')) return;

    try {
      await cartoonService.deleteCartoon(id);
      setCartoons(cartoons.filter(c => c.id !== id));
      showNotification('Cartoon eliminado exitosamente', 'success');
    } catch (error) {
      showNotification('Error al eliminar cartoon', 'error');
    }
  };

  const handleCheckStatus = async (taskId: string) => {
    try {
      const result = await cartoonService.checkTaskResult(taskId);
      setCartoons(cartoons.map(c => c.taskId === taskId ? result : c));
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

  const openCartoonUpdateModal = (id: string) => {
    setSelectedCartoonId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDownloadCartoon = async (imageUrl: string, imageName: string) => {
    try {
      // Usar el endpoint del backend para descargar (evita CORS)
      const downloadUrl = `/api/cartoon/download?imageUrl=${encodeURIComponent(imageUrl)}&forceDownload=true`;
      
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Error al descargar');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = imageName || 'cartoon.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showNotification('¡Imagen descargada exitosamente!', 'success');
    } catch (error) {
      showNotification('Error al descargar la imagen', 'error');
    }
  };

  // Common functions
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>
          <Sparkles size={40} />
          AI Multi-Tool Platform
        </h1>
        <p>Extrae artículos y genera cartoons con Inteligencia Artificial</p>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> :
           notification.type === 'error' ? <XCircle size={20} /> :
           <Info size={20} />}
          {notification.message}
          <button onClick={() => setNotification(null)}>✕</button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <div className="container">
        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <FileText size={20} />
            Article Extractor
          </button>
          <button
            className={`tab ${activeTab === 'cartoons' ? 'active' : ''}`}
            onClick={() => setActiveTab('cartoons')}
          >
            <Palette size={20} />
            Cartoon Generator
          </button>
        </div>

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <>
            {/* Create Form */}
            <section className="form-section">
              <h2>
                <FileText size={28} />
                Crear Nuevo Resumen
              </h2>
              <form onSubmit={handleArticleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="url">URL del Artículo *</label>
                    <input
                      id="url"
                      type="url"
                      placeholder="https://ejemplo.com/articulo"
                      value={articleFormData.url}
                      onChange={(e) => setArticleFormData({ ...articleFormData, url: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="lang">Idioma</label>
                      <select
                        id="lang"
                        value={articleFormData.lang}
                        onChange={(e) => setArticleFormData({ ...articleFormData, lang: e.target.value })}
                      >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="length">Longitud (oraciones)</label>
                      <input
                        id="length"
                        type="number"
                        min="1"
                        max="10"
                        value={articleFormData.length}
                        onChange={(e) => setArticleFormData({ ...articleFormData, length: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 size={20} className="spinner" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Generar Resumen
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Filters */}
            <section className="filters">
              <h3>
                <Filter size={24} />
                Filtros
              </h3>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${articleFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setArticleFilter('all')}
                >
                  Todos ({articles.length})
                </button>
                <button
                  className={`filter-btn ${articleFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setArticleFilter('pending')}
                >
                  Pendientes ({articles.filter(a => a.status === 'pending').length})
                </button>
                <button
                  className={`filter-btn ${articleFilter === 'generated' ? 'active' : ''}`}
                  onClick={() => setArticleFilter('generated')}
                >
                  Generados ({articles.filter(a => a.status === 'generated').length})
                </button>
                <button
                  className={`filter-btn ${articleFilter === 'failed' ? 'active' : ''}`}
                  onClick={() => setArticleFilter('failed')}
                >
                  Fallidos ({articles.filter(a => a.status === 'failed').length})
                </button>
              </div>
            </section>

            {/* Articles List */}
            <section className="items-section">
              <h2>
                <FileText size={28} />
                Artículos ({filteredArticles.length})
              </h2>

              {loading && articles.length === 0 ? (
                <div className="loading">
                  <Loader2 size={32} className="spinner" />
                  Cargando artículos...
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="empty-state">
                  <FileText size={64} />
                  <p>No hay artículos para mostrar</p>
                </div>
              ) : (
                <div className="items-grid">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="item-card">
                      <div className="item-header">
                        <span className="item-id">ID: {article.id}</span>
                        <span className={`status-badge status-${article.status}`}>
                          {article.status}
                        </span>
                      </div>

                      <div className="item-url">
                        <strong>URL:</strong> {article.url}
                      </div>

                      {article.summary && (
                        <div className="item-content">
                          {article.summary}
                        </div>
                      )}

                      {article.errorMessage && (
                        <div className="error-message">
                          <AlertCircle size={16} />
                          {article.errorMessage}
                        </div>
                      )}

                      <div className="item-meta">
                        <span>
                          <Globe size={14} />
                          {article.language.toUpperCase()}
                        </span>
                        <span>
                          <Hash size={14} />
                          {article.length} oraciones
                        </span>
                        <span>
                          <Calendar size={14} />
                          {formatDate(article.createdAt)}
                        </span>
                      </div>

                      <div className="item-actions">
                        <button
                          className="btn btn-warning btn-small"
                          onClick={() => openArticleEditModal(article)}
                          disabled={loading}
                        >
                          <Edit size={16} />
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleArticleDelete(article.id!)}
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Edit Modal */}
            {editingArticle && (
              <div className="modal-overlay" onClick={() => setEditingArticle(null)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h3>
                    <Edit size={24} />
                    Editar Artículo #{editingArticle.id}
                  </h3>
                  
                  <form onSubmit={handleArticleUpdate}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="edit-url">URL del Artículo *</label>
                        <input
                          id="edit-url"
                          type="url"
                          placeholder="https://ejemplo.com/articulo"
                          value={editFormData.url}
                          onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="edit-lang">Idioma</label>
                          <select
                            id="edit-lang"
                            value={editFormData.lang}
                            onChange={(e) => setEditFormData({ ...editFormData, lang: e.target.value })}
                          >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="edit-length">Longitud (oraciones)</label>
                          <input
                            id="edit-length"
                            type="number"
                            min="1"
                            max="10"
                            value={editFormData.length}
                            onChange={(e) => setEditFormData({ ...editFormData, length: parseInt(e.target.value) })}
                          />
                        </div>
                      </div>

                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingArticle(null)}>
                          <X size={20} />
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 size={20} className="spinner" />
                              Actualizando...
                            </>
                          ) : (
                            <>
                              <Sparkles size={20} />
                              Actualizar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {/* Cartoons Tab */}
        {activeTab === 'cartoons' && (
          <>
            {/* Create Form */}
            <section className="form-section">
              <h2>
                <Palette size={28} />
                Generar Nuevo Cartoon
              </h2>
              <form onSubmit={handleCartoonGenerate}>
                <div className="form-grid">
                  {/* Drag & Drop Zone */}
                  <div 
                    className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${selectedFile ? 'has-file' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('cartoon-file-input')?.click()}
                  >
                    <input
                      id="cartoon-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      style={{ display: 'none' }}
                    />
                    
                    {previewUrl ? (
                      <div className="file-preview">
                        <img src={previewUrl} alt="Preview" />
                        <div className="file-info">
                          <p>{selectedFile?.name}</p>
                          <button 
                            type="button" 
                            className="btn-remove-file"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              setPreviewUrl(null);
                            }}
                          >
                            <X size={16} />
                            Cambiar imagen
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="drop-zone-content">
                        <div className="upload-icon">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <p className="drop-zone-title">Arrastra una imagen aquí o haz clic para seleccionar</p>
                        <p className="drop-zone-subtitle">Formatos: JPEG, PNG, BMP, WEBP</p>
                      </div>
                    )}
                  </div>

                  {/* Style Selector */}
                  <div className="style-selector">
                    <label>
                      <Palette size={20} />
                      Estilo de Cartoon:
                    </label>
                    <div className="style-buttons">
                      {[1, 2, 3, 4, 5, 6].map((style) => (
                        <button
                          key={style}
                          type="button"
                          className={`style-btn ${cartoonIndex === style ? 'active' : ''}`}
                          onClick={() => setCartoonIndex(style)}
                        >
                          Estilo {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-generate" disabled={loading || !selectedFile}>
                    {loading ? (
                      <>
                        <Loader2 size={20} className="spinner" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        Generar Cartoon
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            {/* Filters */}
            <section className="filters">
              <h3>
                <Filter size={24} />
                Filtros
              </h3>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${cartoonFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCartoonFilter('all')}
                >
                  Todos ({cartoons.length})
                </button>
                <button
                  className={`filter-btn ${cartoonFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setCartoonFilter('pending')}
                >
                  Pendientes ({cartoons.filter(c => c.status === 'pending').length})
                </button>
                <button
                  className={`filter-btn ${cartoonFilter === 'completed' ? 'active' : ''}`}
                  onClick={() => setCartoonFilter('completed')}
                >
                  Completados ({cartoons.filter(c => c.status === 'completed').length})
                </button>
                <button
                  className={`filter-btn ${cartoonFilter === 'failed' ? 'active' : ''}`}
                  onClick={() => setCartoonFilter('failed')}
                >
                  Fallidos ({cartoons.filter(c => c.status === 'failed').length})
                </button>
              </div>
            </section>

            {/* Cartoons List */}
            <section className="items-section">
              <h2>
                <Palette size={28} />
                Cartoons ({filteredCartoons.length})
              </h2>

              {loading && cartoons.length === 0 ? (
                <div className="loading">
                  <Loader2 size={32} className="spinner" />
                  Cargando cartoons...
                </div>
              ) : filteredCartoons.length === 0 ? (
                <div className="empty-state">
                  <Palette size={64} />
                  <p>No hay cartoons para mostrar</p>
                </div>
              ) : (
                <div className="items-grid">
                  {filteredCartoons.map((cartoon) => (
                    <div key={cartoon.id} className="item-card">
                      <div className="item-header">
                        <span className="item-id">ID: {cartoon.id}</span>
                        <span className={`status-badge status-${cartoon.status}`}>
                          {cartoon.status}
                        </span>
                      </div>

                      <div className="item-url">
                        <strong>Imagen:</strong> {cartoon.imageName}
                      </div>

                      {cartoon.resultUrl && (
                        <div className="cartoon-image-container">
                          <img 
                            src={`/api/cartoon/download?imageUrl=${encodeURIComponent(cartoon.resultUrl)}`}
                            alt={`Cartoon ${cartoon.imageName}`}
                            className="cartoon-image"
                            onError={(e) => {
                              // Si falla, intentar mostrar la URL directa
                              e.currentTarget.src = cartoon.resultUrl!;
                            }}
                          />
                          <button
                            className="btn btn-download"
                            onClick={() => handleDownloadCartoon(cartoon.resultUrl!, cartoon.imageName)}
                            title="Descargar imagen"
                          >
                            <Download size={16} />
                            Descargar
                          </button>
                        </div>
                      )}

                      {cartoon.status === 'pending' && (
                        <div className="info-message">
                          <Info size={16} />
                          Procesando... Usa el botón "Consultar" para verificar el estado.
                        </div>
                      )}

                      {cartoon.errorMsg && (
                        <div className="error-message">
                          <AlertCircle size={16} />
                          {cartoon.errorMsg}
                        </div>
                      )}

                      <div className="item-meta">
                        <span>
                          <Hash size={14} />
                          Estilo: {cartoon.cartoonIndex}
                        </span>
                        <span>
                          <Calendar size={14} />
                          {formatDate(cartoon.createdAt)}
                        </span>
                      </div>

                      <div className="item-actions">
                        {cartoon.status === 'pending' && (
                          <button
                            className="btn btn-info btn-small"
                            onClick={() => handleCheckStatus(cartoon.taskId)}
                            disabled={loading}
                          >
                            <Info size={16} />
                            Consultar
                          </button>
                        )}
                        <button
                          className="btn btn-warning btn-small"
                          onClick={() => openCartoonUpdateModal(cartoon.id)}
                          disabled={loading}
                        >
                          <Edit size={16} />
                          Actualizar
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleCartoonDelete(cartoon.id)}
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Update Modal */}
            {isUpdateModalOpen && (
              <div className="modal-overlay" onClick={() => setIsUpdateModalOpen(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h3>
                    <Edit size={24} />
                    Actualizar Cartoon
                  </h3>
                  
                  <form onSubmit={handleCartoonUpdate}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="update-file">Nueva Imagen *</label>
                        <input
                          id="update-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="update-index">Estilo de Cartoon (1-6)</label>
                        <input
                          id="update-index"
                          type="number"
                          min="1"
                          max="6"
                          value={updateCartoonIndex}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setUpdateCartoonIndex(isNaN(val) ? 1 : val);
                          }}
                        />
                      </div>

                      <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsUpdateModalOpen(false)}>
                          <X size={20} />
                          Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                          {loading ? (
                            <>
                              <Loader2 size={20} className="spinner" />
                              Actualizando...
                            </>
                          ) : (
                            <>
                              <Sparkles size={20} />
                              Actualizar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
