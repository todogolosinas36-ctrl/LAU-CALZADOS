import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
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
}

export default App;
