export interface Departamento {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Ciudad {
  id: string;
  nombre: string;
  descripcion: string;
  idDepartamento: string;
}

export interface Location {
  id: string;
  name: string;
  neighborhood: string;
  descripcion: string;
  departamento: Departamento;
  ciudad: Ciudad;
}

export interface Category {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface SellerUser {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  celular: string;
  fechaNacimiento: string; // ISO date
  correo: string;
  claveHash: string; // bcrypt hash
}

export type HouseStatus = 'PUBLICADA' | 'PUBLICACION_PAUSADA' | 'TRASACCION_CURSO' | 'TRASACCION_FINALIZADA';

export interface House {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: Category;
  cuartos: number;
  banos: number;
  precio: number;
  ubicacion: Location;
  fechaPublicacion: string; // ISO date
  estado: HouseStatus;
  imagenUrl?: string;
  vendedorId: string;
}

export interface VisitSlot {
  /**
   * Cantidad de compradores agendados para este horario (mock/real).
   * HU10: Se usa para filtrar slots disponibles (<2).
   */
  agendados?: number;
  id?: string; // Opcional, para gestión local o mocks
  vendedorId: string;
  casaId: string;
  startDateTime: string; // ISO 8601
  endDateTime: string;   // ISO 8601
}

export interface VisitSlotAgenda {
  horarioId: string;
  compradorEmail: string;
}
