import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskFormSchema, type TaskFormValues } from '../schemas/taskSchema';
import { useUpdateTask, type Task } from '../api/tasks';

interface TaskEditFormProps {
    task: Task;
    onClose: () => void;
    onSuccess: () => void;
}

export default function TaskEditForm({ task, onClose, onSuccess }: TaskEditFormProps) {
    const updateTask = useUpdateTask();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: task.title,
            description: task.description || '',
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString().slice(0, 16)
                : null,
        },
    });

    const onSubmit = async (data: TaskFormValues) => {
        try {
            await updateTask.mutateAsync({
                id: task.id,
                data: {
                    ...data,
                    dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
                },
            });
            onSuccess();
        } catch (error) {
            console.error('Error actualizando tarea:', error);
        }
    };

    const isLoading = isSubmitting || updateTask.isPending;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-neutral-800 border-b border-neutral-700 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-neutral-100">Editar tarea</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-neutral-200 transition p-1"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-200 mb-2">
                                Título
                            </label>
                            <input
                                {...register('title')}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-200 mb-2">
                                Descripción
                            </label>
                            <textarea
                                {...register('description')}
                                rows={3}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition resize-none"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-200 mb-2">
                                Estado
                            </label>
                            <select
                                {...register('status')}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition cursor-pointer"
                            >
                                <option value="TODO">Por hacer</option>
                                <option value="IN_PROGRESS">En progreso</option>
                                <option value="DONE">Completado</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-200 mb-2">
                                Prioridad
                            </label>
                            <select
                                {...register('priority')}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition cursor-pointer"
                            >
                                <option value="LOW">Baja</option>
                                <option value="MEDIUM">Media</option>
                                <option value="HIGH">Alta</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-200 mb-2">
                                Fecha de vencimiento
                            </label>
                            <input
                                type="datetime-local"
                                {...register('dueDate')}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition"
                            />
                            {errors.dueDate && (
                                <p className="mt-1 text-sm text-red-400">{errors.dueDate.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 bg-neutral-800 border border-neutral-700 text-neutral-200 hover:bg-neutral-700 font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-neutral-800 border border-neutral-700 text-neutral-100 hover:bg-neutral-700 font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Guardando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}