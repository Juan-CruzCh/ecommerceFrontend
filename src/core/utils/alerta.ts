import Swal from 'sweetalert2';

export async function confirmarEliminar(nombre?: string): Promise<boolean> {
    return Swal.fire({
        title: '¿Está seguro?',
        text: nombre
            ? `Esta acción eliminará ${nombre} y no se puede deshacer`
            : 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        reverseButtons: true
    }).then(result => result.isConfirmed);
}
