import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Tag } from 'lucide-react';
import { productService } from '../../services/productService';
import ProductFormModal from './ProductFormModal';

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
      } else {
        await productService.addProduct({ ...productData, tags: ['Nuevo'] }); // Default tag
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#14141b] p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-2xl font-bold">Inventario</h2>
          <p className="text-gray-400 text-sm mt-1">Gestiona los {products.length} productos de tu tienda</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-[#0b0b0f] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="whitespace-nowrap px-4 py-2.5 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,85,0,0.3)]"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Añadir Producto</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#14141b] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0b0b0f] border-b border-white/5">
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Producto</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock / Talles</th>
                <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">Cargando inventario...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No hay productos. ¡Añade el primero!</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/50 border border-white/10 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-primary transition-colors">{product.name}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Tag size={12} /> {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {product.sizes?.map(size => (
                          <span key={size} className="px-2 py-0.5 text-[10px] font-bold bg-[#0b0b0f] border border-white/10 rounded text-gray-300">
                            {size}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  );
};

export default AdminInventory;
