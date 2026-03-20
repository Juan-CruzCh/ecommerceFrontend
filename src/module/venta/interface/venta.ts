import type { ImagenesI } from "../../producto/interface/producto"

export interface carritoI {
    codigo: string
    stock: string
    nombre: string
    cantidad: number
    precio: number
    talla: string
}

export interface RealizarVentaI {
    cliente: string
    detalleVenta: { cantidad: number, stock: string }[]
}

export interface listarVentaI {
    _id: string
    codigo: string
    tracking: string
    totalConDescuento: number
    nombre: string
    apellidos: string
    fechaPedido: string
}


export interface DetalleVentaI {
  detalle: Detalle[];
  venta: Venta;
}

export interface Detalle {
  _id: string;
  cantidad: number;
  descripcion: string;
  imagen: ImagenesI[];
  precioTotal: number;
  precioUnitario: number;
}



export interface Venta {
  _id: string;
  apellidos: string;
  codigo: string;
  fechaFinalizado: string; // o Date
  fechaPedido: string;     // o Date
  nombre: string;
  total: number;
  totalConDescuento: number;
  tracking: string;
}