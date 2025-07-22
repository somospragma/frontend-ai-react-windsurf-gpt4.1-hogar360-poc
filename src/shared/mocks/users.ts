export type UserRole = 'admin' | 'comprador' | 'vendedor';

export interface MockUser {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

export const mockUsers: MockUser[] = [
  {
    email: 'admin@hogar360.com',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador General',
  },
  {
    email: 'comprador@hogar360.com',
    password: 'comprador123',
    role: 'comprador',
    name: 'Usuario Comprador',
  },
  {
    email: 'vendedor@hogar360.com',
    password: 'vendedor123',
    role: 'vendedor',
    name: 'Usuario Vendedor',
  },
];
