import type { AppTemplate } from '../types/template';

export function exportTemplate(template: AppTemplate): void {
  const json = JSON.stringify(template, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'template.json';
  a.click();
  URL.revokeObjectURL(url);
}

export function parseTemplateJson(json: string): AppTemplate {
  const obj = JSON.parse(json) as unknown;
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid template: expected an object');
  }
  const t = obj as Record<string, unknown>;
  if (!t.version || !t.pages || !Array.isArray(t.pages)) {
    throw new Error('Invalid template: missing required fields (version, pages)');
  }
  return t as unknown as AppTemplate;
}
