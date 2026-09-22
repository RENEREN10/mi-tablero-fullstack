import { useState } from 'react';
import type { Language } from '../i18n';
import { translations } from '../i18n';

interface TaskFormProps {
  onAddTask: (title: string, description: string) => void;
  lang: Language;
}

export function TaskForm({ onAddTask, lang }: TaskFormProps) {
  const t = translations[lang];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert(t.formAlert);
      return;
    }

    onAddTask(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  return (
    <section className="max-w-4xl mx-auto mb-8 bg-slate-800 border border-slate-700 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-white mb-4">
        {t.formTitle}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            {t.formTitleLabel}
          </label>
          <input
            type="text"
            placeholder={t.formTitlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            {t.formDescLabel}
          </label>
          <textarea
            placeholder={t.formDescPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded transition-colors cursor-pointer"
        >
          {t.formSave}
        </button>
      </form>
    </section>
  );
}