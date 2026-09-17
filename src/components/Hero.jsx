import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const Hero = () => {
  const { scrollY } = useScroll();
  // Parallax effect on background image
  const yImg = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 w-full h-full"
        style={{ y: yImg }}
      >
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Colección Zapatillas" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/80 to-[#0b0b0f]/40 z-10"></div>
      
      {/* Orange Ambient Glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-60 z-10 pointer-events-none"></div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left max-w-2xl mx-auto md:mx-0"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold text-sm mb-6 backdrop-blur-md">
            NUEVA COLECCIÓN 2026
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-xl">
            PISA FUERTE.<br/>
            <span className="text-gradient">MARCA TENDENCIA.</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 drop-shadow-md">
            Encuentra los modelos más exclusivos de zapatillas urbanas y deportivas. Envíos a todo el país y la mejor atención personalizada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,85,0,0.5)] flex items-center justify-center gap-2">
              Explorar Catálogo <ArrowRight size={20} />
            </button>
            <a 
              href="https://wa.me/5491100000000?text=Hola!%20Quiero%20consultar%20por%20stock%20de%20zapatillas."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-surface/60 hover:bg-surface backdrop-blur-md border border-white/20 hover:border-primary/50 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> Consultar Stock
            </a>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
};

export default Hero;
