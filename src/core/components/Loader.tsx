export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="flex flex-col items-center gap-4 pointer-events-auto">
    
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        
 
        <p className="text-gray-700 text-sm">Cargando...</p>

      </div>
    </div>
  )
}