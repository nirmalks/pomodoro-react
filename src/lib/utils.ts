import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (d: Date) => {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`; // DD-MM-YYYY
};

export const getStats = () => {
  const data = JSON.parse(localStorage.getItem('pomodoro-log') || '{}');
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const todayKey = formatDate(today);
  const yesterdayKey = formatDate(yesterday);

  const todayMins = (data[todayKey] || []).reduce((a: number, b: number) => a + b, 0);
  const yesterdayMins = (data[yesterdayKey] || []).reduce((a: number, b: number) => a + b, 0);


  let streak = 0;
  const date = new Date(today);
  while (true) {
    const key = formatDate(date);
    if (data[key]?.length) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return { todayMins, yesterdayMins, streak };
};

export const downloadMarkdownLog = () => {
  const data = JSON.parse(localStorage.getItem('pomodoro-log') || '{}');
  const lines = ['# Pomodoro Log \n'];

  Object.keys(data)
    .sort((a, b) => {
      const [d1, m1, y1] = a.split('-').map(Number);
      const [d2, m2, y2] = b.split('-').map(Number);
      return new Date(y2, m2 - 1, d2).getTime() - new Date(y1, m1 - 1, d1).getTime();
    })
    .reverse()
    .forEach(date => {
      const total = data[date].reduce((a: number, b: number) => a + b, 0);
      const sessions = data[date].length;
      lines.push(`## ${date}`);
      lines.push(`- Total: **${total} min**`);
      lines.push(`- Sessions: ${sessions}`);
      lines.push('');
    });

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pomodoro-log.md';
  a.click();
  URL.revokeObjectURL(url);
};
