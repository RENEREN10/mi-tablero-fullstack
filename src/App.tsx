import { useState, useEffect } from 'react';
import type { Task, TaskStatus } from './types/task';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';
import { fetchTasks, createTask, updateTaskStatus, deleteTask } from './api';
import type { Language } from './i18n';
import { translations } from './i18n';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | TaskStatus>('all');
  const [lang, setLang] = useState<Language>('es');
  const t = translations[lang];

  // 1. Cargar tareas desde la API al abrir la app
  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error al cargar tareas:', err))
      .finally(() => setIsLoading(false));
  }, []);

  // 2. Enviar nueva tarea al backend
  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error('Error al agregar tarea:', error);
    }
  };

  // 3. Cambiar el estado de una tarea en el backend
  const handleStatusChange = async (id: string, newStatus: TaskStatus) => {
    try {
      const updatedTask = await updateTaskStatus(id, newStatus);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  // 4. Eliminar tarea en el backend
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  // Filtrado en el frontend
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ? true : task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <Header
        totalTasks={tasks.length}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
      />

      <TaskForm onAddTask={handleAddTask} lang={lang} />

      {/* Barra de Búsqueda y Filtros */}
      <section className="max-w-4xl mx-auto mb-6 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
        />

        <div className="flex gap-2 text-xs w-full md:w-auto overflow-x-auto">
          {(['all', 'todo', 'in-progress', 'done'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {status === 'all'
                ? t.filterAll
                : status === 'todo'
                ? t.filterTodo
                : status === 'in-progress'
                ? t.filterInProgress
                : t.filterDone}
            </button>
          ))}
        </div>
      </section>

      {/* Listado de Tareas */}
      <main className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="text-center py-12 text-slate-400">
            {t.loading}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg">
            {t.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDeleteTask={handleDeleteTask}
                lang={lang}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}