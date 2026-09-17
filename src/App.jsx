import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

import AdminLayout from './components/admin/AdminLayout';
import AdminInventory from './components/admin/AdminInventory';

// Public Store Layout
const StoreLayout = () => (
  <CartProvider>
    <div className="min-h-screen flex flex-col relative bg-base md:pl-[80px]">
      <Sidebar />
      
      <main className="flex-grow w-full overflow-hidden">
        <Hero />
        <div className="relative">
          {/* Subtle background decoration for grid area */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
          <ProductGrid />
        </div>
      </main>
      
      <Footer />
      <CartDrawer />
    </div>
  </CartProvider>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StoreLayout />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminInventory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
