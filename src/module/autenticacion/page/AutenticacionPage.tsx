import React from 'react';
import { useForm } from 'react-hook-form';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

export const AutenticacionPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    // Lógica de validación privada
    console.log("Intento de acceso privado:", data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center  px-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-100 p-10 shadow-sm">

        {/* Header Simple */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tighter">MARISA</h1>
          <div className="mt-2 h-1 w-12 bg-pink-500 mx-auto rounded-full"></div>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Usuario */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase ml-1">Usuario</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                <User size={18} />
              </div>
              <input
                type="text"
                {...register("username", { required: "Requerido" })}
                className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-pink-200 transition-all placeholder:text-gray-300"
                placeholder="Nombre de usuario"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase ml-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Requerido" })}
                className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-50 focus:border-pink-200 transition-all placeholder:text-gray-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-pink-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Botón de Entrada */}
          <button
            type="submit"
            className="w-full py-4 bg-gray-900 hover:bg-pink-600 text-white text-sm font-bold rounded-xl transition-all active:scale-[0.97] shadow-xl shadow-gray-200 hover:shadow-pink-100 uppercase tracking-widest"
          >
            Acceder al Sistema
          </button>
        </form>

        <p className="text-center text-[10px] text-gray-300 mt-10 uppercase font-medium">
          &copy; {new Date().getFullYear()} MARISA - Acceso Restringido
        </p>
      </div>
    </div>
  );
};