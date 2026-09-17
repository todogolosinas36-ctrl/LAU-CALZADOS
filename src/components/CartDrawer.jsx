import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "Hola! Quiero realizar el siguiente pedido:\n\n";
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (Talle ${item.size}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total Estimado: ${formatPrice(cartTotal)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5491100000000"; // Reemplazar por número real
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">Tu Carrito</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <div className="w-24 h-24 mb-4 opacity-20">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm leading-tight pr-4">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Talle: {item.size}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-base px-2 py-1 rounded-md border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-base/50 border-t border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold">{formatPrice(cartTotal)}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] flex items-center justify-center gap-2 text-lg"
                >
                  <Send size={20} /> Finalizar Pedido
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">Serás redirigido a WhatsApp</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
