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
