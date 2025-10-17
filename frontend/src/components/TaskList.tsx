import { useState } from 'react';
import { useTasks, useDeleteTask, type Task } from '../api/tasks';
import TaskEditForm from './TaskEditForm';

export default function TaskList() {
    const { data: tasks, isLoading, isError } = useTasks();
    const deleteTask = useDeleteTask();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="text-center space-y-3">
                    <div className="inline-block animate-spin">
                        <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-300 rounded-full" />
                    </div>
                    <p className="text-neutral-400">Cargando tareas...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full max-w-2xl bg-neutral-900 border border-red-900/50 rounded-xl p-6 text-center">
                <p className="text-red-400 font-medium">Error al cargar las tareas</p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl p-12 text-center">
                <p className="text-neutral-400 text-lg">No hay tareas aún</p>
                <p className="text-neutral-500 text-sm mt-1">Crea una nueva tarea para comenzar</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={() => setEditingTask(task)}
                    onDelete={() => setDeleteConfirm(task.id)}
                    isDeleting={deleteConfirm === task.id}
                />
            ))}

            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-sm">
                        <h3 className="text-lg font-semibold text-neutral-100 mb-2">
                            Eliminar tarea
                        </h3>
                        <p className="text-neutral-400 text-sm mb-6">
                            ¿Estás seguro? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-neutral-700 font-medium py-2 rounded-lg transition"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    deleteTask.mutate(deleteConfirm);
                                    setDeleteConfirm(null);
                                }}
                                disabled={deleteTask.isPending}
                                className="flex-1 bg-red-900 hover:bg-red-800 border border-red-800 text-red-100 font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deleteTask.isPending ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingTask && (
                <TaskEditForm
                    task={editingTask}
                    onClose={() => setEditingTask(null)}
                    onSuccess={() => setEditingTask(null)}
                />
            )}
        </div>
    );
}

interface TaskItemProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    isDeleting: boolean;
}

function TaskItem({ task, onEdit, onDelete, isDeleting }: TaskItemProps) {
    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition group">
            <div className="flex justify-between items-start gap-4">
                {/* Contenido */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-100 font-semibold text-base break-words">
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
                            {task.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-3 text-xs">
                        <span className={`px-3 py-1 rounded-full font-medium ${getStatusBadgeClass(task.status)}`}>
                            {getStatusLabel(task.status)}
                        </span>
                        <span className={`px-3 py-1 rounded-full font-medium ${getPriorityBadgeClass(task.priority)}`}>
                            {getPriorityLabel(task.priority)}
                        </span>
                        {task.dueDate && (
                            <span className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full">
                                {new Date(task.dueDate).toLocaleDateString('es-ES')}
                            </span>
                        )}
                    </div>

                    <p className="text-neutral-500 text-xs mt-2">
                        {new Date(task.createdAt).toLocaleDateString('es-ES')}
                    </p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={onEdit}
                        className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 rounded-lg transition"
                        aria-label="Editar"
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="p-2 bg-neutral-800 hover:bg-red-900/30 border border-neutral-700 hover:border-red-700 text-neutral-300 hover:text-red-400 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Eliminar"
                        title="Eliminar"
                    >
                        {isDeleting ? '⏳' : '🗑️'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        TODO: 'Por hacer',
        IN_PROGRESS: 'En progreso',
        DONE: 'Completado',
    };
    return labels[status] || status;
}

function getStatusBadgeClass(status: string): string {
    switch (status) {
        case 'TODO':
            return 'bg-neutral-700 text-neutral-200';
        case 'IN_PROGRESS':
            return 'bg-blue-900/40 text-blue-200 border border-blue-800/50';
        case 'DONE':
            return 'bg-green-900/40 text-green-200 border border-green-800/50';
        default:
            return 'bg-neutral-700 text-neutral-200';
    }
}

function getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
        LOW: 'Baja',
        MEDIUM: 'Media',
        HIGH: 'Alta',
    };
    return labels[priority] || priority;
}

function getPriorityBadgeClass(priority: string): string {
    switch (priority) {
        case 'LOW':
            return 'bg-green-900/40 text-green-200 border border-green-800/50';
        case 'MEDIUM':
            return 'bg-yellow-900/40 text-yellow-200 border border-yellow-800/50';
        case 'HIGH':
            return 'bg-red-900/40 text-red-200 border border-red-800/50';
        default:
            return 'bg-neutral-700 text-neutral-200';
    }
}