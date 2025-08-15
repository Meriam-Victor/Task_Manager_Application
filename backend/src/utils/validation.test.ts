import { validatePassword, validateEmail, validateTaskTitle } from './validation';

describe('Validation Utils', () => {
  describe('validatePassword', () => {
    test('should accept valid password', () => {
      expect(validatePassword('Test@123')).toBe(true);
      expect(validatePassword('MyPass123!')).toBe(true);
    });

    test('should reject weak passwords', () => {
      expect(validatePassword('123')).toBe(false);
      expect(validatePassword('password')).toBe(false);
      expect(validatePassword('Password')).toBe(false);
      expect(validatePassword('12345678')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('should accept valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user@domain.org')).toBe(true);
    });

    test('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
    });
  });

  describe('validateTaskTitle', () => {
    test('should accept valid titles', () => {
      expect(validateTaskTitle('Valid Task')).toBe(true);
      expect(validateTaskTitle('  Task with spaces  ')).toBe(true);
    });

    test('should reject empty titles', () => {
      expect(validateTaskTitle('')).toBe(false);
      expect(validateTaskTitle('   ')).toBe(false);
    });
  });
});