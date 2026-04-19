import { describe, it, expect } from 'vitest';
import { parseTemplateJson } from '../utils/templateIO';

const validTemplate = {
  version: '1.0.0',
  theme: { primaryColor: '#1677ff' },
  mockUserProfile: { name: 'Test', tier: 'free', region: 'us', features: {} },
  pages: [
    {
      id: 'p1',
      title: 'Page 1',
      path: '/dashboard',
      grid: { cols: 12, rowHeight: 60, items: [] },
    },
  ],
};

describe('parseTemplateJson', () => {
  it('parses valid template JSON', () => {
    const result = parseTemplateJson(JSON.stringify(validTemplate));
    expect(result.version).toBe('1.0.0');
    expect(result.pages).toHaveLength(1);
  });

  it('throws on invalid JSON string', () => {
    expect(() => parseTemplateJson('not json')).toThrow();
  });

  it('throws when version is missing', () => {
    const noVersion = { ...validTemplate, version: undefined };
    expect(() => parseTemplateJson(JSON.stringify(noVersion))).toThrow('version');
  });

  it('throws when pages is missing', () => {
    const noPages = { ...validTemplate, pages: undefined };
    expect(() => parseTemplateJson(JSON.stringify(noPages))).toThrow('pages');
  });

  it('throws when pages is not an array', () => {
    const badPages = { ...validTemplate, pages: 'bad' };
    expect(() => parseTemplateJson(JSON.stringify(badPages))).toThrow('pages');
  });
});
