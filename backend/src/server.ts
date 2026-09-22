import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

interface Task {
  id: string;
  title: string;
  description: string;
  titleEn?: string;
  descriptionEn?: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}

let tasks: Task[] = [
  {
    id: '1',
    title: 'Servidor REST configurado',
    description: 'API corriendo exitosamente en Node.js con Express y TypeScript.',
    titleEn: 'REST Server Configured',
    descriptionEn: 'API successfully running on Node.js with Express and TypeScript.',
    status: 'done',
    createdAt: '2026-09-22',
  },
  {
    id: '2',
    title: 'Conectar Frontend con Backend',
    description: 'Reemplazar localStorage con llamadas fetch hacia la API.',
    titleEn: 'Connect Frontend to Backend',
    descriptionEn: 'Replace localStorage with fetch calls to the API.',
    status: 'in-progress',
    createdAt: '2026-09-22',
  },
];

// 1. GET: Obtener tareas
app.get('/api/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});

// 2. POST: Crear tarea
app.post('/api/tasks', (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Título y descripción son requeridos' });
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    description,
    status: 'todo',
    createdAt: new Date().toISOString().split('T')[0],
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

// 3. PATCH: Actualizar estado
app.patch('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks[taskIndex].status = status;
  res.json(tasks[taskIndex]);
});

// 4. DELETE: Eliminar tarea
app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});