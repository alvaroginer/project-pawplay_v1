import { useState, type FormEvent } from "react";
import { validateEmail, validatePassword } from "../../utils/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ForgotPasswordModal } from "../../components/modals/forgotPassword/ForgotPasswordModal";
import "./Login.css";
import dogImage from "../../imgs/dog-login.png";
import { Link } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar campos antes de enviar
    let isValid = true;

    // Validar email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validar contraseña
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    setIsLoading(true); // Activar el spinner

    // Simulamos una carga de 2 segundos
    try {
      // Aquí iría la lógica real de autenticación
      console.log("Login with:", { email, password });

      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      //Actualizar useState/useContext de LogIn
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aqui procesariamos la respuesta del servidor
      console.log("Login successful!");

      // Desactivar el spinner después de la carga
      setIsLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="modal">
        <div className="modal__image-container">
          <img
            src={dogImage || "/placeholder.svg"}
            alt="Perro con gafas trabajando en un portátil"
            className="modal__image"
          />
        </div>
        <div className="modal__content">
          <h1 className="modal__title">PawPlay</h1>
          <h2 className="modal__subtitle">Become a PawPlayer</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form__input ${
                  emailError ? "form__input--error" : ""
                }`}
                placeholder="Put your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError && validateEmail(e.target.value)) {
                    setEmailError("");
                  }
                }}
                required
                disabled={isLoading}
              />
              {emailError && <span className="form__error">{emailError}</span>}
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`form__input ${
                  passwordError ? "form__input--error" : ""
                }`}
                placeholder="Put a strong password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError && validatePassword(e.target.value)) {
                    setPasswordError("");
                  }
                }}
                required
                disabled={isLoading}
              />
              {passwordError && (
                <span className="form__error">{passwordError}</span>
              )}
              <a
                href="#"
                className="form__forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLoading) setShowForgotPassword(true);
                }}
              >
                Forgot password?
              </a>
            </div>

            <button type="submit" className="form__button" disabled={isLoading}>
              {isLoading ? (
                <div className="spinner">
                  <div className="spinner__circle"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <Link to="/signin" className=" form__sign-in-link">
              <span className="or-text">or</span> Sign In
            </Link>

            <p className="form__policy">
              by become a paw player you agree to our{" "}
              <a href="#" className="form__link">
                Terms of Services
              </a>{" "}
              and{" "}
              <a href="#" className="form__link">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>

      {showForgotPassword && (
        <ForgotPasswordModal
          email={email}
          onEmailChange={setEmail}
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  );
};
