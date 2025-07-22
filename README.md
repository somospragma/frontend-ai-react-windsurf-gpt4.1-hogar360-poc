# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Stack Tecnológico
- Vite 5
- React 18 + TypeScript
- Tailwind CSS (plugin oficial para Vite)
- Zustand (global state)
- react-router-dom (ruteo)
- react-hook-form + zod (formularios y validación)
- Font Awesome (iconografía)

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

## Flujo de trabajo Gitflow (manual)
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

## Instalación y ejecución
```bash
npm install
npm run dev
```

## Referencias
- [Figma Sistema de Diseño](https://www.figma.com/design/598hfN0nUaRfziiFQ3kOXM/Reto-Hogar360?node-id=0-1&p=f&t=kvsjhB18VLkd8V75-0)
- [Reglas globales del proyecto](./Contexto/project-rules-react.md)
- [User Stories y mínimos](./Contexto/HUs.csv, ./Contexto/minimos_dev.csv)

---

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
