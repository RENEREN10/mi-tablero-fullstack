import type { Task, TaskStatus } from '../types/task';
import type { Language } from '../i18n';
import { translations } from '../i18n';

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
  lang: Language;
}

export function TaskCard({ task, onStatusChange, onDeleteTask, lang }: TaskCardProps) {
  const t = translations[lang];
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-between hover:border-slate-500 transition-colors">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
              task.status === 'done'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : task.status === 'in-progress'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-slate-700 text-slate-300'
            }`}
          >
            {task.status === 'done'
              ? t.statusDone
              : task.status === 'in-progress'
              ? t.statusInProgress
              : t.statusTodo}
          </span>

          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-slate-500 hover:text-red-400 p-1 text-xs transition-colors cursor-pointer"
            title={t.deleteTitle}
          >
            ✕
          </button>
        </div>

        <h3 className="font-semibold text-lg text-white mb-2">{lang === 'en' && task.titleEn ? task.titleEn : task.title}</h3>
        <p className="text-slate-400 text-sm mb-4">{lang === 'en' && task.descriptionEn ? task.descriptionEn : task.description}</p>
      </div>

      <div className="pt-3 border-t border-slate-700/50 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
          <span>{t.createdLabel} {task.createdAt}</span>
        </div>
        <div className="flex gap-1 text-xs">
          {task.status !== 'todo' && (
            <button
              onClick={() => onStatusChange(task.id, 'todo')}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors cursor-pointer"
            >
              {t.btnTodo}
            </button>
          )}
          {task.status !== 'in-progress' && (
            <button
              onClick={() => onStatusChange(task.id, 'in-progress')}
              className="px-2 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 rounded transition-colors cursor-pointer"
            >
              {t.btnInProgress}
            </button>
          )}
          {task.status !== 'done' && (
            <button
              onClick={() => onStatusChange(task.id, 'done')}
              className="px-2 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 rounded transition-colors cursor-pointer"
            >
              {t.btnDone}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}