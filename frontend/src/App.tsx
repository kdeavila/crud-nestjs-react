import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-black text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              CRUD with
              <div className="relative inline-block mx-2">
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-blue-500 blur-2xl opacity-30 animate-pulse" />
                <span className="relative bg-gradient-to-r from-red-500 via-red-600 to-blue-500 bg-clip-text text-transparent">
                  NestJS & React
                </span>
              </div>
            </h1>
            <p className="text-neutral-400">
              Manage your tasks easily and efficiently
            </p>
          </div>

          <div className="space-y-6">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}