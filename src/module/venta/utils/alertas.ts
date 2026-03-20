import Swal from "sweetalert2";

export const confirmarVenta = async () => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas realizar esta venta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vender",
    cancelButtonText: "Cancelar"
  });

  return result.isConfirmed; 
};

export const mostrarError = async (mensaje:string) => {
  await Swal.fire({
    title: "Error",
    text: mensaje,
    icon: "error",
    confirmButtonText: "Aceptar",
  });

  return true;
};