import type { Language } from '../i18n';
import { translations } from '../i18n';

interface HeaderProps {
  totalTasks: number;
  lang: Language;
  onToggleLang: () => void;
}

export function Header({ totalTasks, lang, onToggleLang }: HeaderProps) {
  const t = translations[lang];
  return (
    <header className="max-w-4xl mx-auto mb-8 flex justify-between items-end border-b border-slate-800 pb-4">
      <div>
        <h1 className="text-3xl font-bold text-blue-400">
          {t.headerTitle}
        </h1>
        <p className="text-slate-400 mt-1">
          {t.headerSubtitle}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={onToggleLang}
          title={t.toggleTitle}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-medium text-slate-200 transition-colors cursor-pointer"
        >
          {t.toggleButton}
        </button>
        <div className="text-xs text-slate-500 font-mono">
          Total: {totalTasks} {totalTasks === 1 ? t.totalSingular : t.totalPlural}
        </div>
      </div>
    </header>
  );
}