# Backend - Tasks API (NestJS + Prisma + SQLite)

## 📋 Resumen

API REST completa para gestión de tareas (CRUD) desarrollada con **NestJS**, **Prisma ORM** y **SQLite**. Incluye validaciones robustas, documentación Swagger automática, manejo de errores y tests unitarios.

## 🎯 Características

- ✅ CRUD completo de tareas (Create, Read, Update, Delete)
- ✅ Validaciones de datos con `class-validator`
- ✅ Documentación automática con Swagger UI
- ✅ Manejo de errores con excepciones personalizadas
- ✅ Tests unitarios con Jest
- ✅ Base de datos SQLite (desarrollo) con Prisma ORM
- ✅ TypeScript estricto
- ✅ CORS habilitado para frontend

## 📦 Requisitos Previos

- **Node.js** >= 18.x
- **pnpm** >= 8.x (o npm/yarn)
- **Git**

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd crud-nestjs-react/backend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` si necesitas cambiar la configuración:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
```

### 4. Generar cliente de Prisma y ejecutar migraciones

```bash
# Generar el cliente de Prisma
pnpm run prisma:generate

# Ejecutar migraciones (crea la base de datos)
pnpm run prisma:migrate
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con hot-reload)
pnpm run start:dev

# Modo producción
pnpm run build
pnpm run start:prod
```

El servidor estará disponible en: **http://localhost:3001**

## 📚 Documentación API (Swagger)

Una vez iniciado el servidor, accede a la documentación interactiva:

🔗 **http://localhost:3001/docs**

Desde Swagger puedes:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente
- Ver los schemas de datos
- Consultar ejemplos de request/response

## 🗂️ Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma          # Definición del modelo de datos
│   ├── prisma.module.ts       # Módulo de Prisma
│   └── prisma.service.ts      # Servicio de Prisma (cliente)
├── src/
│   ├── tasks/                 # Módulo de tareas
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts    # DTO para crear tarea
│   │   │   └── update-task.dto.ts    # DTO para actualizar tarea
│   │   ├── task-response.dto.ts      # DTO de respuesta
│   │   ├── tasks.controller.ts       # Controlador REST
│   │   ├── tasks.service.ts          # Lógica de negocio
│   │   └── tasks.module.ts           # Módulo de tareas
│   ├── app.module.ts          # Módulo raíz
│   ├── app.controller.ts      # Health check endpoint
│   ├── app.service.ts
│   └── main.ts                # Punto de entrada
├── test/
│   └── tasks.service.spec.ts  # Tests unitarios del servicio
├── .env.example               # Variables de entorno de ejemplo
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 Endpoints de la API

### Health Check

```http
GET /
```

Respuesta:
```json
{
  "status": "ok",
  "uptime": 123.456
}
```

### Tareas

#### 1. Crear una tarea

```http
POST /tasks
Content-Type: application/json

{
  "title": "Comprar víveres",
  "description": "Leche, huevos, pan",
  "status": "TODO",
  "priority": "MEDIUM",
  "dueDate": "2025-10-31T00:00:00.000Z"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "Comprar víveres",
  "description": "Leche, huevos, pan",
  "status": "TODO",
  "priority": "MEDIUM",
  "dueDate": "2025-10-31T00:00:00.000Z",
  "createdAt": "2025-10-17T20:00:00.000Z",
  "updatedAt": "2025-10-17T20:00:00.000Z"
}
```

#### 2. Obtener todas las tareas

```http
GET /tasks
```

**Respuesta (200 OK):**
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Comprar víveres",
    "description": "Leche, huevos, pan",
    "status": "TODO",
    "priority": "MEDIUM",
    "dueDate": "2025-10-31T00:00:00.000Z",
    "createdAt": "2025-10-17T20:00:00.000Z",
    "updatedAt": "2025-10-17T20:00:00.000Z"
  }
]
```

#### 3. Obtener una tarea por ID

```http
GET /tasks/:id
```

**Respuesta (200 OK):** Objeto de tarea

**Respuesta (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Task with id {id} not found",
  "error": "Not Found"
}
```

#### 4. Actualizar una tarea

```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Comprar víveres (actualizado)",
  "status": "IN_PROGRESS"
}
```

**Respuesta (200 OK):** Objeto de tarea actualizado

#### 5. Eliminar una tarea

```http
DELETE /tasks/:id
```

**Respuesta (200 OK):** Objeto de tarea eliminado

## 📊 Modelo de Datos

### Task

| Campo | Tipo | Descripción | Validaciones |
|-------|------|-------------|-------------|
| `id` | UUID | Identificador único | Generado automáticamente |
| `title` | string | Título de la tarea | Obligatorio, 1-100 caracteres |
| `description` | string \| null | Descripción detallada | Opcional, 0-500 caracteres |
| `status` | enum | Estado de la tarea | `TODO` \| `IN_PROGRESS` \| `DONE` (default: `TODO`) |
| `priority` | enum | Prioridad | `LOW` \| `MEDIUM` \| `HIGH` (default: `MEDIUM`) |
| `dueDate` | DateTime \| null | Fecha límite (ISO 8601) | Opcional |
| `createdAt` | DateTime | Fecha de creación | Generado automáticamente |
| `updatedAt` | DateTime | Fecha de última actualización | Actualizado automáticamente |

## 🧪 Tests

### Ejecutar tests unitarios

```bash
pnpm run test
```

### Ejecutar tests con cobertura

```bash
pnpm run test:cov
```

### Tests implementados

- ✅ `TasksService.create()` - Creación de tareas
- ✅ `TasksService.findAll()` - Listado de tareas
- ✅ `TasksService.findOne()` - Búsqueda por ID
- ✅ `TasksService.findOne()` - Manejo de error 404
- ✅ `TasksService.update()` - Actualización de tareas
- ✅ `TasksService.remove()` - Eliminación de tareas

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm run start:dev          # Inicia el servidor en modo desarrollo
pnpm run start:debug        # Inicia con debugger

# Producción
pnpm run build              # Compila el proyecto
pnpm run start:prod         # Inicia el servidor en producción

# Prisma
pnpm run prisma:generate    # Genera el cliente de Prisma
pnpm run prisma:migrate     # Ejecuta migraciones
pnpm run prisma:studio      # Abre Prisma Studio (GUI)

# Tests
pnpm run test               # Ejecuta tests unitarios
pnpm run test:watch         # Ejecuta tests en modo watch
pnpm run test:cov           # Ejecuta tests con cobertura

# Calidad de código
pnpm run lint               # Ejecuta ESLint
pnpm run format             # Formatea código con Prettier
```

## 🔧 Tecnologías Utilizadas

- **NestJS** 11.x - Framework backend
- **Prisma** 6.x - ORM
- **SQLite** - Base de datos (desarrollo)
- **TypeScript** 5.x - Lenguaje
- **class-validator** - Validaciones
- **Swagger/OpenAPI** - Documentación
- **Jest** - Testing

## 📝 Validaciones Implementadas

### CreateTaskDto
- `title`: Requerido, string de 1-100 caracteres
- `description`: Opcional, string de 0-500 caracteres
- `status`: Opcional, enum (`TODO`, `IN_PROGRESS`, `DONE`), default: `TODO`
- `priority`: Opcional, enum (`LOW`, `MEDIUM`, `HIGH`), default: `MEDIUM`
- `dueDate`: Opcional, fecha en formato ISO 8601

### UpdateTaskDto
- Todos los campos son opcionales
- Mismas validaciones que CreateTaskDto cuando se proporcionan

## 🚨 Manejo de Errores

La API maneja los siguientes errores:

- **400 Bad Request**: Validación de datos fallida
- **404 Not Found**: Tarea no encontrada
- **500 Internal Server Error**: Errores del servidor

Ejemplo de respuesta de error:
```json
{
  "statusCode": 400,
  "message": [
    "title must be longer than or equal to 1 characters",
    "title should not be empty"
  ],
  "error": "Bad Request"
}
```

## 🔐 CORS

CORS está habilitado para permitir peticiones desde:
- `http://localhost:3000` (frontend React)

Para modificar los orígenes permitidos, edita `src/main.ts`:

```typescript
app.enableCors({origin: 'http://localhost:3000'});
```


## 👤 Autor

Keyner de Ávila
Desarrollado como parte de la prueba técnica de Novacore.
