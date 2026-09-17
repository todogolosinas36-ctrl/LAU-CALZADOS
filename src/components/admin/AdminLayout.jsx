import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Inventario', path: '/admin', icon: <Package size={20} /> },
    { name: 'Configuración', path: '#', icon: <Settings size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div>
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,85,0,0.4)]">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tighter">
            ADMIN <span className="text-primary">PANEL</span>
          </span>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <Link 
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut size={20} /> Volver a Tienda
        </Link>
      </div>
    </>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#060608] text-white font-sans overflow-hidden">
      
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between h-16 px-4 bg-[#0b0b0f] border-b border-white/5 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(255,85,0,0.4)]">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold tracking-tighter">ADMIN</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 h-full w-4/5 max-w-sm bg-[#0b0b0f] z-50 flex flex-col justify-between shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-white/5 bg-[#0b0b0f] flex-col justify-between flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 border-b border-white/5 bg-[#0b0b0f]/80 backdrop-blur-md items-center justify-between px-8 flex-shrink-0">
          <h1 className="font-semibold text-lg text-gray-200">Gestión de Tienda</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(255,85,0,0.5)]">
              LC
            </div>
          </div>
        </header>

        {/* Content View (Router Outlet) */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8 w-full">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
