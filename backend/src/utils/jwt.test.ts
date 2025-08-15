import { generateToken, verifyToken } from './jwt';

describe('JWT Utils', () => {
  test('should generate a token', () => {
    const token = generateToken(123);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('should verify a valid token', () => {
    const token = generateToken(123);
    const result = verifyToken(token);
    expect(result.userId).toBe(123);
  });

  test('should throw error for invalid token', () => {
    expect(() => {
      verifyToken('invalid-token');
    }).toThrow('Invalid token');
  });
});