import { products as seedProducts } from '../products';

// TODO: Integración futura con Supabase
// import { supabase } from './supabaseClient';

const STORAGE_KEY = 'lau_calzados_inventory';

export const productService = {
  getProducts: async () => {
    // ----------------------------------------------------
    // TODO (Supabase): 
    // const { data, error } = await supabase.from('products').select('*');
    // if (error) throw error;
    // return data;
    // ----------------------------------------------------
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          resolve(JSON.parse(stored));
        } else {
          // Si no hay nada, cargar data semilla
          localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
          resolve(seedProducts);
        }
      }, 300); // Simulando red
    });
  },

  addProduct: async (newProduct) => {
    // ----------------------------------------------------
    // TODO (Supabase): 
    // const { data, error } = await supabase.from('products').insert([newProduct]).select();
    // if (error) throw error;
    // return data[0];
    // ----------------------------------------------------

    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const product = { 
          ...newProduct, 
          id: Date.now() // ID temporal
        };
        const updated = [...stored, product];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(product);
      }, 300);
    });
  },

  updateProduct: async (id, updatedFields) => {
    // ----------------------------------------------------
    // TODO (Supabase): 
    // const { data, error } = await supabase.from('products').update(updatedFields).eq('id', id).select();
    // if (error) throw error;
    // return data[0];
    // ----------------------------------------------------

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = stored.findIndex(p => p.id === id);
        if (index === -1) return reject(new Error('Producto no encontrado'));
        
        stored[index] = { ...stored[index], ...updatedFields };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        resolve(stored[index]);
      }, 300);
    });
  },

  deleteProduct: async (id) => {
    // ----------------------------------------------------
    // TODO (Supabase): 
    // const { error } = await supabase.from('products').delete().eq('id', id);
    // if (error) throw error;
    // return true;
    // ----------------------------------------------------

    return new Promise((resolve) => {
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const filtered = stored.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        resolve(true);
      }, 300);
    });
  }
};
