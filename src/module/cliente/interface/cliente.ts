export interface clienteForm {
    ci: string
    nombre: string
    apellidos: string
    celular: string
    direccion: string
}


export interface listarClienteI extends clienteForm {
    codigo: string
    _id: string
}