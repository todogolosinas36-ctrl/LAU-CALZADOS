import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Inventario', path: '/admin', icon: <Package size={20} /> },
    { name: 'Configuración', path: '#', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#060608] text-white font-sans overflow-hidden">
      
      {/* Sidebar Admin */}
      <aside className="w-64 border-r border-white/5 bg-[#0b0b0f] flex flex-col justify-between">
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#0b0b0f]/80 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="font-semibold text-lg text-gray-200">Gestión de Tienda</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(255,85,0,0.5)]">
              LC
            </div>
          </div>
        </header>

        {/* Content View (Router Outlet) */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
