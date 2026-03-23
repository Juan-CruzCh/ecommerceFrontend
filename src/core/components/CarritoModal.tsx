import { X, Plus, Minus } from 'lucide-react';
import { useEstadoModal } from '../utils/appUtil';
import type { CarritoI } from '../../module/producto/interface/producto';

export const CarritoModal = () => {
  const { isOpen, closeModal } = useEstadoModal();
  if (!isOpen) return null;
  const datosLocal = localStorage.getItem("carrito");
  const productos:CarritoI[] = datosLocal ? JSON.parse(datosLocal) : [];
  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-0">

      <div className="absolute inset-0 bg-black/5" onClick={closeModal}></div>

   
      <div className="relative bg-white w-full max-w-[260px] shadow-xl border-l border-b border-gray-100 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
        

        <div className="px-4 py-3 border-b flex justify-between items-center bg-white">
          <span className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em]">Carrito (2)</span>
          <button 
            onClick={closeModal} 
            className="text-gray-400 hover:text-black transition-colors"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

  
        <div className="max-h-[350px] overflow-y-auto p-4 space-y-6">
         {
          productos.map((item)=> (
             <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold text-gray-900 uppercase leading-none">{item.nombre}</h3>
              <p className="text-[9px] text-gray-500 font-medium tracking-tight">Talla {item.talla} · {item.precioVenta} Bs</p>
              <div className="flex items-center border border-gray-200 w-fit mt-2">
                <button className="px-1.5 py-1 text-gray-400 hover:text-black transition-colors">
                  <Minus size={10} strokeWidth={3} />
                </button>
                <span className="px-2 text-[9px] font-bold border-x border-gray-200 text-gray-800">{item.cantidad}</span>
                <button className="px-1.5 py-1 text-gray-400 hover:text-black transition-colors">
                  <Plus size={10} strokeWidth={3} />
                </button>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-900">{item.total} Bs</p>
          </div>
    
          ))
         }  

        </div>
        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <span className="text-xs font-black text-gray-900">{productos.reduce((acc,item )=> acc + item.total,0)} Bs</span>
          </div>
          
          <button className="w-full bg-black text-white text-[9px] font-bold py-3.5 hover:bg-zinc-800 transition-all active:invert tracking-[0.2em] uppercase">
            Comprar ahora
          </button>
        </div>

      </div>
    </div>
  );
};