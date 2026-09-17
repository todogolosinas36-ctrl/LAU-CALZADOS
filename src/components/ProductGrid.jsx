import React, { useState } from 'react';
import ProductCard from './ProductCard';
import BrandFilter from './BrandFilter';
import { products } from '../products';
import { motion, AnimatePresence } from 'framer-motion';

const ProductGrid = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

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
            {filteredProducts.map((product, index) => (
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
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No se encontraron productos para esta marca.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
