import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FileText, 
  Filter, 
  Loader2, 
  AlertCircle, 
  Trash2, 
  Edit, 
  Globe, 
  Hash,
  Calendar,
  X
} from 'lucide-react';
import { articleService } from './services/api';
import type { ArticleSummary, ArticleRequest } from './types/article';
import './App.css';

function App() {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Form state
  const [formData, setFormData] = useState<ArticleRequest>({
    url: '',
    lang: 'es',
    length: 3,
  });

  // Edit modal state
  const [editingArticle, setEditingArticle] = useState<ArticleSummary | null>(null);
  const [editFormData, setEditFormData] = useState<ArticleRequest>({
    url: '',
    lang: 'es',
    length: 3,
  });

  // Load articles on mount
  useEffect(() => {
    loadArticles();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilter(activeFilter);
  }, [articles, activeFilter]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getAll();
      setArticles(data);
    } catch (err) {
      setError('Error al cargar los artículos. Verifica que el backend esté corriendo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredArticles(articles);
    } else if (filter === 'pending' || filter === 'generated' || filter === 'failed') {
      setFilteredArticles(articles.filter(a => a.status === filter));
    } else if (filter === 'es' || filter === 'en') {
      setFilteredArticles(articles.filter(a => a.language === filter));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url.trim()) {
      setError('Por favor ingresa una URL válida');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await articleService.create(formData);
      
      // Reset form
      setFormData({
        url: '',
        lang: 'es',
        length: 3,
      });
      
      // Reload articles
      await loadArticles();
    } catch (err) {
      setError('Error al crear el resumen. Verifica la URL y el backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await articleService.delete(id);
      await loadArticles();
    } catch (err) {
      setError('Error al eliminar el artículo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (article: ArticleSummary) => {
    setEditingArticle(article);
    setEditFormData({
      url: article.url,
      lang: article.language,
      length: article.length,
    });
  };

  const closeEditModal = () => {
    setEditingArticle(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingArticle || !editFormData.url.trim()) {
      setError('Por favor ingresa una URL válida');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await articleService.update(editingArticle.id!, editFormData);
      closeEditModal();
      await loadArticles();
    } catch (err) {
      setError('Error al actualizar el artículo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>
            <Sparkles size={48} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Article Extractor & Summarizer
          </h1>
          <p>Extrae y resume artículos web con Inteligencia Artificial</p>
        </header>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Create Form */}
        <section className="form-section">
          <h2>
            <FileText size={28} />
            Crear Nuevo Resumen
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="url">URL del Artículo *</label>
                <input
                  id="url"
                  type="url"
                  placeholder="https://ejemplo.com/articulo"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="lang">Idioma</label>
                  <select
                    id="lang"
                    value={formData.lang}
                    onChange={(e) => setFormData({ ...formData, lang: e.target.value })}
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
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: parseInt(e.target.value) })}
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
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos ({articles.length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pendientes ({articles.filter(a => a.status === 'pending').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'generated' ? 'active' : ''}`}
              onClick={() => setActiveFilter('generated')}
            >
              Generados ({articles.filter(a => a.status === 'generated').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'failed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('failed')}
            >
              Fallidos ({articles.filter(a => a.status === 'failed').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'es' ? 'active' : ''}`}
              onClick={() => setActiveFilter('es')}
            >
              Español ({articles.filter(a => a.language === 'es').length})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'en' ? 'active' : ''}`}
              onClick={() => setActiveFilter('en')}
            >
              English ({articles.filter(a => a.language === 'en').length})
            </button>
          </div>
        </section>

        {/* Articles List */}
        <section className="articles-section">
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
            <div className="articles-grid">
              {filteredArticles.map((article) => (
                <div key={article.id} className="article-card">
                  <div className="article-header">
                    <span className="article-id">ID: {article.id}</span>
                    <span className={`status-badge status-${article.status}`}>
                      {article.status}
                    </span>
                  </div>

                  <div className="article-url">
                    <strong>URL:</strong> {article.url}
                  </div>

                  {article.summary && (
                    <div className="article-summary">
                      {article.summary}
                    </div>
                  )}

                  {article.errorMessage && (
                    <div className="error-message">
                      <AlertCircle size={16} />
                      {article.errorMessage}
                    </div>
                  )}

                  <div className="article-meta">
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

                  <div className="article-actions">
                    <button
                      className="btn btn-warning btn-small"
                      onClick={() => openEditModal(article)}
                      disabled={loading}
                    >
                      <Edit size={16} />
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => handleDelete(article.id!)}
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
          <div className="modal-overlay" onClick={closeEditModal}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>
                <Edit size={24} />
                Editar Artículo #{editingArticle.id}
              </h3>
              
              <form onSubmit={handleUpdate}>
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
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>
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
      </div>
    </div>
  );
}

export default App;
