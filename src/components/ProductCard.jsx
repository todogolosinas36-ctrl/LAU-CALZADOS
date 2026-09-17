import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      className="glass-card rounded-2xl overflow-hidden group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Dynamic Glow Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 85, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Image & Tags */}
      <div className="relative aspect-square overflow-hidden bg-white/5 p-4 flex items-center justify-center">
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.tags?.map(tag => (
            <span key={tag} className="px-2 py-1 bg-black/60 backdrop-blur-md text-xs font-bold rounded-md border border-white/10 text-white">
              {tag}
            </span>
          ))}
        </div>
        
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-1 text-xs text-primary font-bold tracking-wider">{product.brand.toUpperCase()}</div>
        <h3 className="text-lg font-bold text-white mb-2 truncate">{product.name}</h3>
        <div className="text-xl font-extrabold text-white mb-4">{formatPrice(product.price)}</div>

        {/* Size Selector */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2">Talle (ARG)</div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-md text-xs font-bold flex items-center justify-center transition-all ${
                  selectedSize === size 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-surface border border-white/10 text-gray-300 hover:border-primary/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <button 
          onClick={() => addToCart(product, selectedSize)}
          className="w-full py-3 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_15px_rgba(255,85,0,0.3)]"
        >
          <ShoppingCart size={18} /> Agregar al Carrito
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
