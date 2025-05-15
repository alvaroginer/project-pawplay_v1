import { useState, useContext, type FormEvent } from "react";
import { Input } from "../../components/input/Input";
import { AuthContext } from "../../auth/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { ForgotPasswordModal } from "../../components/modals/forgotPassword/ForgotPasswordModal";
import { Link, useNavigate } from "react-router";
import "./Login.css";
import dogImage from "../../imgs/dog-login.png";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // const auth = useContext(AuthContext);
  // if (!auth) throw new Error("AuthContext must be used within an AuthProvider");
  // const { login } = auth;

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
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;

      const userSnap = await getDoc(doc(db, "users", uid));
      //Falta logear el perfil, habrá que seleccionar el último que se esocgió
      login(userSnap.data());

      //Actualizar useState/useContext de LogIn
      console.log("Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Desactivar el spinner después de la carga
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='modal'>
        <div className='modal__image-container'>
          <img
            src={dogImage || "/placeholder.svg"}
            alt='Perro con gafas trabajando en un portátil'
            className='modal__image'
          />
        </div>
        <div className='modal__content'>
          <h1 className='modal__title'>PawPlay</h1>
          <h2 className='modal__subtitle'>Become a PawPlayer</h2>

          <form className='form' onSubmit={handleSubmit}>
            <div className='form__group'>
              <Input
                name='email'
                label='Email'
                placeholder='Put your email'
                value={email}
                className={`${emailError ? "form__input--error" : ""}`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError && validateEmail(e.target.value)) {
                    setEmailError("");
                  }
                }}
                editable='string'
                disabled={isLoading}
                helpText={emailError}
              />
            </div>

            <div className='form__group'>
              <Input
                name='password'
                password={true}
                label='Password'
                placeholder='Put your password'
                value={password}
                className={` ${passwordError ? "form__input--error" : ""}`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError && validatePassword(e.target.value)) {
                    setPasswordError("");
                  }
                }}
                disabled={isLoading}
                editable='string'
                helpText={passwordError}
              />
              <a
                href='#'
                className='form__forgot-link'
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLoading) setShowForgotPassword(true);
                }}
              >
                Forgot password?
              </a>
            </div>

            <button type='submit' className='form__button' disabled={isLoading}>
              {isLoading ? (
                <div className='spinner'>
                  <div className='spinner__circle'></div>
                </div>
              ) : (
                "Login"
              )}
            </button>

            <Link to='/signin' className=' form__sign-in-link'>
              <span className='or-text'>or</span> Sign In
            </Link>

            <p className='form__policy'>
              by become a paw player you agree to our{" "}
              <a href='#' className='form__link'>
                Terms of Services
              </a>{" "}
              and{" "}
              <a href='#' className='form__link'>
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
