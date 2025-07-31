# Hogar360 Frontend

Frontend profesional para la gestión inmobiliaria, desarrollado con **React + TypeScript + Vite**, siguiendo Atomic Design, Clean Code, accesibilidad y buenas prácticas de DX.

## 🛠️ Stack Tecnológico real
- Vite ^7.0.4
- React ^19.1.0 + TypeScript ~5.8.3
- Tailwind CSS ^4.1.11 (y @tailwindcss/vite)
- Zustand ^5.0.6 (global state)
- react-router-dom ^7.7.0 (ruteo)
- react-hook-form ^7.60.0 + zod ^4.0.5 (formularios y validación)
- Font Awesome (core, solid, brands, react)
- @hookform/resolvers ^5.1.1
- bcryptjs ^3.0.2 (mock hashing)
- uuid ^11.1.0 (IDs)

> Consulta siempre `package.json` para dependencias y versiones actualizadas.

## Estructura de Carpetas (LIFT + Atomic Design)
```
src/
├── assets/           # Recursos estáticos (imágenes, fuentes)
│   ├── fonts/
│   └── images/
├── components/       # Atomic Design
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── shared/           # Lógica de negocio y utilidades
│   ├── constants/
│   ├── helpers/
│   ├── hooks/
│   ├── store/
│   ├── mocks/
│   └── interfaces/
├── pages/            # Páginas de la app
├── services/         # Servicios API
│   ├── categories/
│   └── api.ts
├── styles/           # Estilos globales (Tailwind, SCSS)
│   ├── globals.css
│   └── globals.scss
└── App.tsx
└── main.tsx
```

## Flujo de trabajo Gitflow (actualizado)
- `main`: rama principal, solo para releases estables.
- `develop`: rama base para integración de nuevas features.
- `feature/*`: para nuevas funcionalidades.
- `release/*`: para preparar versiones.
- `hotfix/*`: para corrección de errores en producción.

### Comandos iniciales
```bash
git checkout main
git checkout -b develop
git push -u origin main develop
```

### Reglas
- Todo desarrollo parte de `develop` o ramas `feature/*`.
- Pull Requests deben ser revisados antes de mergear a `develop` o `main`.
- Mantener actualizado este README a medida que evoluciona el Frontend.

## 🛠️ Desarrollo y estructura

### Usuarios de prueba y roles

El sistema de autenticación mock soporta los siguientes usuarios de prueba, cada uno con un rol representativo del sistema:

| Email                       | Contraseña      | Rol                  | Descripción                        |
|-----------------------------|-----------------|----------------------|-------------------------------------|
| admin@hogar360.com          | admin123        | admin                | Administrador general               |
| comprador@hogar360.com      | comprador123    | comprador            | Usuario comprador                   |
| vendedor@hogar360.com       | vendedor123     | vendedor             | Usuario vendedor                    |

**Nota:** El registro de usuarios no está implementado (fuera del alcance de HU8). Para ingresar, use uno de los usuarios de prueba anteriores en la pantalla de login.

### Funcionalidades principales

#### Gestión de categorías (HU1 + HU2)

- `/categories`: Vista única para crear (solo admin) y listar categorías (todos los roles autenticados).
- Listado paginado (5 por página) y filtrable por nombre.
- El listado se actualiza automáticamente al crear una nueva categoría.
- Validaciones en tiempo real, feedback visual y UI alineada al diseño de Figma.
- Responsive: dashboard side-by-side en desktop, stacked en mobile.

#### Gestión de ubicaciones (HU3)

- `/locations`: Página protegida, solo accesible para usuarios con rol **admin**.
- Incluye formulario para crear ubicaciones y listado en tiempo real.
- La opción 'Ubicaciones' aparece en el menú lateral (AsidePanel) solo para el rol admin.
- Si un usuario no autenticado intenta acceder, será redirigido a `/login`.
- Si un usuario autenticado sin rol admin intenta acceder, será redirigido a `/`.
- La protección de rutas se implementa mediante el componente `ProtectedRoute`, que recibe un prop `role` para restringir por rol.
- El acceso y visibilidad de rutas y menús está centralizado y documentado.

#### Gestión de casas y visitas/agendas

- `/houses`: Página para listar y crear casas (todos los roles autenticados).
- `/visits`: Página para listar y crear visitas/agendas (todos los roles autenticados).
- Listado paginado (5 por página) y filtrable por nombre.
- El listado se actualiza automáticamente al crear una nueva casa o visita/agenda.
- Validaciones en tiempo real, feedback visual y UI alineada al diseño de Figma.
- Responsive: dashboard side-by-side en desktop, stacked en mobile.

### Convenciones y buenas prácticas del código

- Se sigue el patrón de diseño Atomic Design para la estructura de componentes.
- Se utiliza Tailwind CSS para estilos y layout.
- Se utiliza TypeScript para tipado estático y seguridad.
- Se utiliza ESLint para linting y formateo de código.
- Se utiliza Prettier para formateo de código.

### Instalación y comandos útiles

```bash
npm install
npm run dev
```

### Referencias y enlaces claros

- [Figma Sistema de Diseño](https://www.figma.com/design/598hfN0nUaRfziiFQ3kOXM/Reto-Hogar360?node-id=0-1&p=f&t=kvsjhB18VLkd8V75-0)
- [Reglas globales del proyecto](./Contexto/project-rules-react.md)
- [User Stories y mínimos](./Contexto/HUs.csv, ./Contexto/minimos_dev.csv)

### Notas relevantes para onboarding y mantenimiento

- El proyecto utiliza Gitflow para el flujo de trabajo.
- Se recomienda revisar el README y la documentación del proyecto antes de empezar a trabajar.
- Se recomienda utilizar los comandos `npm install` y `npm run dev` para instalar y ejecutar el proyecto.
- Se recomienda revisar las referencias y enlaces claros para obtener más información sobre el proyecto.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
