import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

/**
 * Servicio que maneja la lógica de negocio para las operaciones CRUD de tareas.
 * Utiliza Prisma como ORM para interactuar con la base de datos.
 */
@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Crea una nueva tarea en la base de datos.
     * @param dto - Datos de la tarea a crear (título, descripción, estado, prioridad, fecha límite)
     * @returns La tarea creada con todos sus campos, incluyendo id y timestamps
     */
    async create(dto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description ?? null,
                status: dto.status,
                priority: dto.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
            }
        })
    }

    /**
     * Obtiene todas las tareas de la base de datos.
     * @returns Array de tareas ordenadas por fecha de creación (más recientes primero)
     */
    async findAll() {
        return this.prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    }

    /**
     * Busca una tarea específica por su ID.
     * @param id - UUID de la tarea a buscar
     * @returns La tarea encontrada
     * @throws NotFoundException si la tarea no existe
     */
    async findOne(id: string) {
        const task = await this.prisma.task.findUnique({ where: { id } });

        if (!task) throw new NotFoundException(`Task with id ${id} not found`);
        return task;
    }

    /**
     * Actualiza una tarea existente.
     * @param id - UUID de la tarea a actualizar
     * @param dto - Campos a actualizar (todos opcionales)
     * @returns La tarea actualizada
     * @throws NotFoundException si la tarea no existe
     */
    async update(id: string, dto: UpdateTaskDto) {
        await this.findOne(id);

        return this.prisma.task.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
                priority: dto.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : dto.dueDate ?? null,
            },
        })
    }

    /**
     * Elimina una tarea de la base de datos.
     * @param id - UUID de la tarea a eliminar
     * @returns La tarea eliminada
     * @throws NotFoundException si la tarea no existe
     */
    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.task.delete({ where: { id } });
    }
}