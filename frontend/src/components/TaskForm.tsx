import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskFormSchema, type TaskFormValues } from '../schemas/taskSchema';
import { useCreateTask } from '../api/tasks';

export default function TaskForm() {
  const createTask = useCreateTask();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: null,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await createTask.mutateAsync({
        ...data,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
      });
      reset();
    } catch (error) {
      console.error('Error creando tarea:', error);
    }
  };

  const isLoading = isSubmitting || createTask.isPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            Title
          </label>
          <input
            {...register('title')}
            placeholder="My new task..."
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            Description (optional)
          </label>
          <textarea
            {...register('description')}
            placeholder="Task details..."
            rows={3}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition resize-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            Status
          </label>
          <select
            {...register('status')}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition cursor-pointer"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            Priority
          </label>
          <select
            {...register('priority')}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-transparent transition cursor-pointer"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-200 mb-2">
            Due Date (optional)
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

      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-100 font-medium py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Guardando...' : '+ Crear tarea'}
      </button>
    </form>
  );
}