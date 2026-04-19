import type { VisibilityRule, MockUserProfile } from '../types/template';

function getValueByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc !== null && acc !== undefined && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function evaluateVisibility(
  rule: VisibilityRule | undefined,
  profile: MockUserProfile,
): boolean {
  if (!rule) return true;

  const profileAsRecord = profile as unknown as Record<string, unknown>;
  const actual = getValueByPath(profileAsRecord, rule.path);

  switch (rule.op) {
    case '==':
      return actual === rule.value;
    case '!=':
      return actual !== rule.value;
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(actual);
    case 'notIn':
      return Array.isArray(rule.value) && !rule.value.includes(actual);
    case 'truthy':
      return Boolean(actual);
    case 'falsy':
      return !actual;
    default:
      return true;
  }
}
