import React, { useState, useEffect } from 'react';
import { X, Save, UploadCloud } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Nike',
    price: '',
    category: 'Zapatillas Urbanas',
    image: '',
    description: '',
    sizes: [],
  });

  const availableSizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const brands = ['Nike', 'Adidas', 'Vans', 'New Balance', 'Puma', 'Reebok'];
  const categories = ['Zapatillas Urbanas', 'Deportivas', 'Botitas', 'Indumentaria'];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '', brand: 'Nike', price: '', category: 'Zapatillas Urbanas', image: '', description: '', sizes: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size].sort((a,b) => a - b)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-[#14141b] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0b0b0f]">
          <h2 className="text-xl font-bold">{initialData ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Nombre del Modelo</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Ej. Nike Air Max" />
              </div>

              {/* Precio */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Precio (ARS)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Ej. 125000" />
              </div>

              {/* Marca */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Marca</label>
                <select name="brand" value={formData.brand} onChange={handleChange} className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Categoría */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* URL Imagen */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium flex items-center gap-2">
                <UploadCloud size={16} /> URL de Imagen
              </label>
              <input required type="url" name="image" value={formData.image} onChange={handleChange} className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="https://..." />
              {formData.image && (
                <div className="mt-4 w-32 h-32 rounded-xl overflow-hidden border border-white/10">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
                </div>
              )}
            </div>

            {/* Talles */}
            <div className="space-y-3">
              <label className="text-sm text-gray-400 font-medium">Talles Disponibles</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                      formData.sizes.includes(size)
                        ? 'bg-primary text-white border-primary border-2 shadow-[0_0_10px_rgba(255,85,0,0.3)]'
                        : 'bg-[#0b0b0f] border border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {formData.sizes.length === 0 && <p className="text-xs text-red-400 mt-1">Debes seleccionar al menos un talle.</p>}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Descripción (Opcional)</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Detalles extra del producto..."></textarea>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5 bg-[#0b0b0f] flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-300 font-medium hover:text-white transition-colors">
            Cancelar
          </button>
          <button 
            type="submit" 
            form="productForm"
            disabled={formData.sizes.length === 0}
            className="px-6 py-2.5 bg-primary hover:bg-secondary disabled:opacity-50 disabled:hover:bg-primary text-white font-bold rounded-lg transition-all shadow-[0_4px_14px_0_rgba(255,85,0,0.39)] flex items-center gap-2"
          >
            <Save size={18} /> {initialData ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
