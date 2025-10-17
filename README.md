# CRUD de Tareas - NestJS + React + TypeScript

## 📋 Descripción

Aplicación full-stack completa para gestión de tareas (CRUD completo) desarrollada como prueba técnica para **Novacore**.

El proyecto está dividido en dos partes completamente funcionales:
- **Backend**: API REST con NestJS, Prisma y PostgreSQL
- **Frontend**: Aplicación React moderna con tema oscuro

## ✅ **PROYECTO COMPLETADO - 100% FUNCIONAL**

### Backend ✅ **COMPLETADO**
- ✅ API REST completa con NestJS
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Validaciones robustas con class-validator
- ✅ Documentación automática con Swagger
- ✅ Tests unitarios con Jest (8/8 pasando)
- ✅ Manejo de errores centralizado
- ✅ CORS configurado para frontend

### Frontend ✅ **COMPLETADO**
- ✅ Aplicación React 19 + TypeScript
- ✅ Gestión de estado con TanStack Query
- ✅ Formularios con React Hook Form + Zod
- ✅ UI moderna con tema oscuro y TailwindCSS
- ✅ CRUD completo con estados de carga profesionales
- ✅ Diseño responsivo móvil primero

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

### Instalación Completa

#### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd crud-nestjs-react
```

#### 2. Ejecutar Backend

```bash
cd backend
pnpm install
cp .env.example .env
pnpm run prisma:generate
pnpm run prisma:migrate
pnpm run start:dev
```

Backend disponible en: **http://localhost:3001** 🚀
Documentación Swagger: **http://localhost:3001/docs**

#### 3. Ejecutar Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

Frontend disponible en: **http://localhost:5173** 🎨

## 📚 Documentación Detallada

- [📖 Documentación del Backend](./backend/README.md) - Guía completa del API
- [📖 Documentación del Frontend](./frontend/README.md) - Guía de la aplicación React

## 🗂️ Estructura del Proyecto

```
crud-nestjs-react/
├── backend/                    # API NestJS ✅ COMPLETA
│   ├── prisma/                # Schema y configuración de Prisma
│   ├── src/
│   │   ├── tasks/            # Módulo de tareas (CRUD completo)
│   │   ├── app.module.ts     # Módulo raíz
│   │   └── main.ts           # Punto de entrada
│   ├── test/                 # Tests unitarios (8/8 ✅)
│   └── README.md             # Documentación completa
├── frontend/                  # Aplicación React ✅ COMPLETA
│   ├── src/
│   │   ├── api/             # Cliente HTTP y hooks
│   │   ├── components/      # Componentes React modernos
│   │   └── schemas/         # Validaciones Zod
│   └── README.md            # Documentación actualizada
└── README.md                 # Este archivo
```

## 🧪 Tests

### Backend ✅ **8/8 Tests Pasando**

```bash
cd backend
pnpm run test          # Tests unitarios
pnpm run test:cov      # Tests con cobertura
```

## 🔧 Tecnologías Utilizadas

### Backend
- **NestJS** 11.x - Framework Node.js empresarial
- **Prisma** 6.x - ORM moderno con type safety
- **PostgreSQL** - Base de datos robusta
- **TypeScript** 5.x - Desarrollo type-safe
- **class-validator** - Validaciones declarativas
- **Swagger/OpenAPI** - Documentación automática
- **Jest** - Framework de testing

### Frontend
- **React** 19.x - Framework frontend moderno
- **TypeScript** 5.x - Type safety completo
- **Vite** 4.x - Build tool ultra rápido
- **TanStack Query** 5.x - Gestión de estado y caché
- **React Hook Form** 7.x - Formularios reactivos
- **Zod** 4.x - Validación de schemas
- **TailwindCSS** 4.x - CSS utility-first moderno

## 🔌 Endpoints de la API

### Health Check
```http
GET /
```

### Tareas CRUD
```http
GET    /tasks       # Listar todas las tareas
GET    /tasks/:id   # Obtener una tarea específica
POST   /tasks       # Crear nueva tarea
PUT    /tasks/:id   # Actualizar tarea existente
DELETE /tasks/:id   # Eliminar tarea
```

Ver ejemplos completos en la [documentación del backend](./backend/README.md#-endpoints-de-la-api).

## 🚨 Manejo de Errores

La API maneja correctamente:
- **400 Bad Request**: Errores de validación de datos
- **404 Not Found**: Recursos no encontrados
- **500 Internal Server Error**: Errores internos del servidor

## 👤 Autor

**Keyner de Ávila**  
Desarrollado como parte de la prueba técnica de **Novacore**.

---

## 🎯 Características Destacadas

### **🔥 Stack Tecnológico Moderno**
- **Backend**: NestJS + Prisma + PostgreSQL + TypeScript
- **Frontend**: React 19 + TypeScript + TanStack Query + TailwindCSS
- **Arquitectura**: Full-stack con separación clara de responsabilidades

### **✨ Funcionalidades Completas**
- **CRUD completo** tanto en backend como frontend
- **Validaciones robustas** en ambos lados
- **UI profesional** con tema oscuro moderno
- **Tests automatizados** asegurando calidad
- **Documentación completa** para mantenimiento

### **🚀 Listo para Producción**
- Código limpio y mantenible
- Configuración de desarrollo y producción
- Manejo profesional de errores
- Performance optimizado

---

## 📌 Notas de Desarrollo

### Decisiones Técnicas

- **PostgreSQL**: Elegido para producción por robustez y características avanzadas
- **Prisma**: Excelente DX, type-safety completo y migraciones automáticas
- **class-validator**: Estándar en NestJS para validaciones declarativas
- **Swagger**: Documentación automática y testing interactivo
- **React 19**: Última versión con mejoras de performance
- **TanStack Query**: Gestión de estado moderna y eficiente
- **Tema oscuro**: Diseño profesional y moderno

**Status: ✅ PROYECTO COMPLETADO Y LISTO PARA PRODUCCIÓN** 🚀
