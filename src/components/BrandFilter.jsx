import React from 'react';
import { brands } from '../products';

const BrandFilter = ({ selectedBrand, setSelectedBrand }) => {
  return (
    <div className="w-full overflow-x-auto hide-scrollbar py-6 border-y border-white/5 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-6">
          <button
            onClick={() => setSelectedBrand(null)}
            className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all ${
              selectedBrand === null ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
              selectedBrand === null ? 'border-primary shadow-[0_0_15px_rgba(255,85,0,0.5)]' : 'border-white/20'
            } bg-surface`}>
              <span className="text-xs font-bold">ALL</span>
            </div>
            <span className="text-xs font-medium">Todas</span>
          </button>

          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all ${
                selectedBrand === brand ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-100'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                selectedBrand === brand ? 'border-primary shadow-[0_0_15px_rgba(255,85,0,0.5)]' : 'border-white/20'
              } bg-surface overflow-hidden`}>
                <span className="text-xs font-bold">{brand.substring(0,3).toUpperCase()}</span>
              </div>
              <span className="text-xs font-medium">{brand}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
