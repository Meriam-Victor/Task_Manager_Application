export const validatePassword = (password: string): boolean => {
  if (!password || password.length < 8) return false;
  
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*#?&]/.test(password);
  
  return hasLetter && hasNumber && hasSpecial;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTaskTitle = (title: string): boolean => {
  return !!(title && title.trim().length > 0);
};