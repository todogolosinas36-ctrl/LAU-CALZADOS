import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import BrandFilter from './BrandFilter';
import { productService } from '../services/productService';
import { brands } from '../products'; // We can keep brands array static for now, or derive it from products
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedBrand 
    ? products.filter(p => p.brand === selectedBrand)
    : products;

  return (
    <section className="py-12 relative min-h-screen">
      <BrandFilter selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Catálogo</h2>
            <p className="text-gray-400 mt-2">
              {selectedBrand ? `Mostrando modelos de ${selectedBrand}` : 'Todos nuestros modelos disponibles'}
            </p>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredProducts.length} Productos
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-20 text-gray-400">
                Cargando modelos exclusivos...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500">
                No se encontraron productos para esta marca.
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
