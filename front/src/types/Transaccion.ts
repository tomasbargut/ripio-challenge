import { Cuenta, User } from "./User";

export type TransaccionEstado = "PROCESANDO" | "APROBADA" | "RECHAZADA"

export type Transaccion = NuevaTransaccion & {
  id: number,
  estado: TransaccionEstado,
  fecha: Date
}

export type NuevaTransaccion = {
  monto: number,
  emisor: number,
  receptor: number
}