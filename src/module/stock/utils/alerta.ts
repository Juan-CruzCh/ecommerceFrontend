import Swal from "sweetalert2";

export const confirmarStock = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas registrar este stock?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, registrar",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed; 
};