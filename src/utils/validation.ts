// Funciones de validación para el formulario

/**
 * Valida el formato de un email
 * @param email Email a validar
 * @returns true si el email es válido, false en caso contrario
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que una contraseña cumpla con los requisitos mínimos
 * @param password Contraseña a validar
 * @returns true si la contraseña es válida, false en caso contrario
 */
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};
