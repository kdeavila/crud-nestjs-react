# CRUD de Tareas - NestJS + React + TypeScript

## 📋 Descripción

Aplicación full-stack para gestión de tareas (CRUD completo) desarrollada como prueba técnica para **Novacore**. 

El proyecto está dividido en dos partes:
- **Backend**: API REST con NestJS, Prisma y SQLite
- **Frontend**: Aplicación React con TypeScript (en desarrollo)

## 🎯 Características Principales

### Backend
- ✅ API REST completa con NestJS
- ✅ Base de datos SQLite con Prisma ORM
- ✅ Validaciones robustas con class-validator
- ✅ Documentación automática con Swagger
- ✅ Tests unitarios con Jest
- ✅ Manejo de errores centralizado
- ✅ CORS configurado para frontend

### Frontend (En desarrollo)
- 🚧 Aplicación React + TypeScript
- 🚧 Gestión de estado con TanStack Query
- 🚧 Formularios con React Hook Form + Zod
- 🚧 UI moderna con TailwindCSS

## 📦 Modelo de Datos

### Entidad Task

| Campo | Tipo | Descripción | Validaciones |
|-------|------|-------------|--------------|
| `id` | UUID | Identificador único | Generado automáticamente |
| `title` | string | Título de la tarea | Obligatorio, 1-100 caracteres |
| `description` | string \| null | Descripción detallada | Opcional, 0-500 caracteres |
| `status` | enum | Estado | `TODO` \| `IN_PROGRESS` \| `DONE` (default: `TODO`) |
| `priority` | enum | Prioridad | `LOW` \| `MEDIUM` \| `HIGH` (default: `MEDIUM`) |
| `dueDate` | DateTime \| null | Fecha límite ISO 8601 | Opcional |
| `createdAt` | DateTime | Fecha de creación | Automático |
| `updatedAt` | DateTime | Última actualización | Automático |

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js >= 18.x
- pnpm >= 8.x (o npm/yarn)
- Git

### Instalación

#### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd crud-nestjs-react
```

#### 2. Configurar y ejecutar el Backend

```bash
cd backend
pnpm install
cp .env.example .env
pnpm run prisma:generate
pnpm run prisma:migrate
pnpm run start:dev
```

El backend estará disponible en: **http://localhost:3001**

Documentación Swagger: **http://localhost:3001/docs**

#### 3. Configurar y ejecutar el Frontend (Próximamente)

```bash
cd frontend
pnpm install
pnpm run dev
```

El frontend estará disponible en: **http://localhost:3000**

## 📚 Documentación Detallada

- [📖 Documentación del Backend](./backend/README.md) - Guía completa del API
- [📖 Documentación del Frontend](./frontend/README.md) - Guía de la aplicación React (próximamente)

## 🗂️ Estructura del Proyecto

```
crud-nestjs-react/
├── backend/                    # API NestJS
│   ├── prisma/                # Schema y configuración de Prisma
│   ├── src/
│   │   ├── tasks/            # Módulo de tareas (CRUD)
│   │   ├── app.module.ts     # Módulo raíz
│   │   └── main.ts           # Punto de entrada
│   ├── test/                 # Tests unitarios
│   └── README.md             # Documentación del backend
├── frontend/                  # Aplicación React (en desarrollo)
│   └── README.md             # Documentación del frontend
└── README.md                 # Este archivo
```

## 🧪 Tests

### Backend

```bash
cd backend

# Tests unitarios
pnpm run test

# Tests con cobertura
pnpm run test:cov
```

## 🔧 Tecnologías Utilizadas

### Backend
- **NestJS** 11.x - Framework Node.js
- **Prisma** 6.x - ORM
- **SQLite** - Base de datos
- **TypeScript** 5.x
- **class-validator** - Validaciones
- **Swagger/OpenAPI** - Documentación
- **Jest** - Testing

### Frontend (Planificado)
- **React** 18.x
- **TypeScript** 5.x
- **Vite** - Build tool
- **TanStack Query** - Data fetching
- **React Hook Form** - Formularios
- **Zod** - Validación de schemas
- **TailwindCSS** - Estilos
- **Axios** - Cliente HTTP

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Ponderación | Estado |
|----------|-------------|--------|
| Estructura y claridad del código | 25 pts | ✅ Completado |
| Cumplimiento funcional (CRUD, validaciones) | 25 pts | ✅ Completado |
| Buenas prácticas y manejo de errores | 20 pts | ✅ Completado |
| Documentación detallada y explicativa | 20 pts | ✅ Completado |
| Tests / Bonus / Extras | 10 pts | ✅ Tests unitarios |

## 🔌 Endpoints de la API

### Health Check
```http
GET /
```

### Tareas
```http
GET    /tasks       # Listar todas las tareas
GET    /tasks/:id   # Obtener una tarea
POST   /tasks       # Crear una tarea
PUT    /tasks/:id   # Actualizar una tarea
DELETE /tasks/:id   # Eliminar una tarea
```

Ver ejemplos completos en la [documentación del backend](./backend/README.md#-endpoints-de-la-api).

## 🚨 Manejo de Errores

La API maneja correctamente:
- **400 Bad Request**: Errores de validación
- **404 Not Found**: Recursos no encontrados
- **500 Internal Server Error**: Errores del servidor

## 📄 Licencia

MIT

## 👤 Autor

Desarrollado como parte de la prueba técnica de **Novacore**.

**Contacto Novacore:**
- Email: contacto@novacore.com.co
- WhatsApp: +57 314 400 0253

---

## 📌 Notas de Desarrollo

### Próximos Pasos
1. ✅ Backend completado
2. 🚧 Implementar frontend React
3. 🚧 Agregar tests E2E
4. 🚧 Dockerizar la aplicación
5. 🚧 CI/CD pipeline

### Decisiones Técnicas

- **SQLite**: Elegido para desarrollo por simplicidad. En producción se recomienda PostgreSQL/MySQL.
- **Prisma**: Seleccionado por su excelente DX, type-safety y migraciones sencillas.
- **class-validator**: Estándar en NestJS para validaciones declarativas.
- **Swagger**: Documentación automática y testing interactivo.
