import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Home, Compass, Percent, Shirt } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Inicio', icon: <Home size={22} />, href: '#' },
    { name: 'Catálogo', icon: <Compass size={22} />, href: '#' },
    { name: 'Indumentaria', icon: <Shirt size={22} />, href: '#' },
    { name: 'Ofertas', icon: <Percent size={22} />, href: '#' },
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <motion.div 
        className="hidden md:flex fixed top-0 left-0 h-full z-50 glass border-r border-white/5 flex-col justify-between py-8 transition-all duration-300 ease-in-out"
        initial={{ width: 80 }}
        animate={{ width: isHovered ? 260 : 80 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top: Logo & Search */}
        <div className="flex flex-col gap-8 px-5 overflow-hidden">
          {/* Logo Area */}
          <div className="flex items-center gap-4 h-10 w-[220px]">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary rounded-xl font-bold text-white shadow-[0_0_15px_rgba(255,85,0,0.4)]">
              L
            </div>
            <span className={`text-xl font-bold tracking-tighter whitespace-nowrap transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              LAU <span className="text-primary">CALZADOS</span>
            </span>
          </div>

          {/* Search Button */}
          <button className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors w-[220px]">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <Search size={22} />
            </div>
            <span className={`whitespace-nowrap font-medium transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              Buscar...
            </span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-col gap-2 px-5 overflow-hidden">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href}
              className="flex items-center gap-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all w-[220px] group"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center group-hover:text-primary transition-colors">
                {item.icon}
              </div>
              <span className={`whitespace-nowrap font-medium transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {item.name}
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom: Cart & Social */}
        <div className="flex flex-col gap-4 px-5 overflow-hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-4 text-white hover:bg-white/5 rounded-xl transition-all w-[220px] group relative"
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center relative group-hover:text-primary transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <div className={`flex items-center justify-between flex-1 pr-4 whitespace-nowrap transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="font-bold">Carrito</span>
              {cartCount > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                  {cartCount} items
                </span>
              )}
            </div>
          </button>

          <a 
            href="https://instagram.com/_laucalzados" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 text-gray-400 hover:text-[#E1306C] transition-colors w-[220px]"
          >
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <InstagramIcon size={22} />
            </div>
            <span className={`whitespace-nowrap font-medium transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              Instagram
            </span>
          </a>
        </div>
      </motion.div>

      {/* --- MOBILE SIDEBAR --- */}
      {/* Mobile Menu Toggle Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-5 left-5 z-[100] w-12 h-12 bg-surface/80 backdrop-blur-md flex items-center justify-center rounded-full text-white border border-white/10 shadow-lg hover:bg-primary transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Cart Floating Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-[90] w-14 h-14 bg-primary flex items-center justify-center rounded-full text-white shadow-[0_0_20px_rgba(255,85,0,0.4)]"
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 text-xs font-bold text-white bg-surface rounded-full flex items-center justify-center border-2 border-primary">
            {cartCount}
          </span>
        )}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm glass z-[101] flex flex-col p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold tracking-tighter">
                  LAU <span className="text-primary">CALZADOS</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6 flex-1">
                {navItems.map((item, index) => (
                  <a key={index} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-primary">
                    {item.icon} {item.name}
                  </a>
                ))}
              </nav>

              <div className="mt-auto border-t border-white/10 pt-6">
                <a 
                  href="https://instagram.com/_laucalzados" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 text-lg font-medium text-gray-300 hover:text-[#E1306C]"
                >
                  <InstagramIcon size={24} /> Seguir en Instagram
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
