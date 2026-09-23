import type { Task, TaskStatus } from './types/task';

const API_URL = 'https://mi-tablero-backend.onrender.com/api/tasks';

// 1. Obtener todas las tareas del backend
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
};

// 2. Crear nueva tarea en el backend
export const createTask = async (title: string, description: string): Promise<Task> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
};

// 3. Cambiar estado de tarea en el backend
export const updateTaskStatus = async (id: string, status: TaskStatus): Promise<Task> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Error al actualizar tarea');
  return res.json();
};

// 4. Eliminar tarea en el backend
export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tarea');
};