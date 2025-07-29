import type { Ciudad } from '../interfaces/types.d.ts';

export const mockCiudades: Ciudad[] = [
  { id: '1', nombre: 'Medellín', descripcion: 'Capital de Antioquia', idDepartamento: '1' },
  { id: '2', nombre: 'Cali', descripcion: 'Capital del Valle del Cauca', idDepartamento: '2' },
  { id: '3', nombre: 'Bogotá', descripcion: 'Capital de Cundinamarca', idDepartamento: '3' },
  { id: '4', nombre: 'Envigado', descripcion: 'Ciudad satélite de Medellín', idDepartamento: '1' },
  { id: '5', nombre: 'Palmira', descripcion: 'Ciudad del Valle', idDepartamento: '2' },
];
