import { TaskPriority } from './Task';

describe('Task Model', () => {
  test('should have correct priority values', () => {
    expect(TaskPriority.HIGH).toBe('high');
    expect(TaskPriority.MEDIUM).toBe('medium');
    expect(TaskPriority.LOW).toBe('low');
  });

  test('should validate priority is one of allowed values', () => {
    const validPriorities = Object.values(TaskPriority);
    expect(validPriorities).toContain('high');
    expect(validPriorities).toContain('medium');
    expect(validPriorities).toContain('low');
    expect(validPriorities).not.toContain('urgent');
  });
});