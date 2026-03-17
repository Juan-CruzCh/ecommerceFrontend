export interface UsuarioFormData {
    nombre: string;
    apellidos: string;
    ci: string;
    celular: string;
    usuario: string;
    password: string;
    rol: string;
}

export interface listarUsuariosI {
    _id: string
    nombre: string;
    apellidos: string;
    ci: string;
    celular: string;
    usuario: string;

    rol: string;
}
