import React from 'react';
import { MapPin, Clock, CreditCard, Truck } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './Icons';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold tracking-tighter mb-6 block">
              LAU <span className="text-primary">CALZADOS</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Tu tienda de confianza para encontrar los modelos más exclusivos de zapatillas. Calidad, estilo y la mejor atención.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Encontranos</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Sarmiento 17, Local 2 y 3<br/>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Lunes a Sábados<br/>10:00 hs a 20:00 hs</span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-6">Beneficios</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <CreditCard size={18} className="text-primary" />
                <span>Todos los medios de pago</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Truck size={18} className="text-primary" />
                <span>Envíos a todo el país</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-primary" />
                <span>Retiro en sucursal gratis</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Novedades</h4>
            <p className="text-gray-400 text-sm mb-4">
              Suscribite para enterarte de los nuevos ingresos antes que nadie.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email..." 
                className="bg-base border border-white/10 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg font-bold transition-colors">
                Unirme
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Lau Calzados. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
