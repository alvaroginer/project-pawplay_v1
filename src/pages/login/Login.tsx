import { useState, useContext } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { AuthContext } from "../../hooks/auth/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginAuthContext } from "../../dataBase/auth/AuthFunctions";
//import { ForgotPasswordModal } from "../../components/modals/forgotPassword/ForgotPasswordModal";
import { LogInData } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { authGoogle } from "../../dataBase/auth/AuthFunctions";
import "./Login.css";
import dogImage from "../../imgs/dog-login.png";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import google from "../../imgs/google.svg";

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInData>();

  const onSubmit: SubmitHandler<LogInData> = async (formData) => {
    setIsLoading(true); // Activar el spinner
    console.log(formData);

    // Simulamos una carga de 2 segundos
    try {
      // Lógica real de autenticación
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const uid = user.uid;

      const logInData = await loginAuthContext(uid);
      if (!logInData) return;

      const { userData, profileData } = logInData;
      //Actualizamos useState/useContext de LogIn
      login(userData, profileData);

      console.log("Login successful!");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Desactivar el spinner después de la carga
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        console.log(`Firebase error (${error.code}): ${error.message}`);

        setError("email", {
          type: "manual",
          message: `Invalid email or password.`,
        });
        setIsLoading(false);
      }
    }
  };

  // const onGoogleSubmit = async () => {

  // };

  return (
    <div className="login">
      <div className="login__arrow-container">
        <img
          className="login__arrow"
          src={arrow}
          alt="Icon to return"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="login__modal">
        <div className="login__image-container">
          <img
            src={dogImage || "/placeholder.svg"}
            alt="Perro con gafas trabajando en un portátil"
            className="login__image"
          />
        </div>
        <div className="login__content">
          <h1 className="login__title">PawPlay</h1>
          <h2 className="login__subtitle">Become a PawPlayer</h2>

          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__form-group">
              <Input
                label="Email"
                placeholder="Put your email"
                className={`${errors.email ? "input--error" : ""}`}
                editable="string"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                helpText={errors.email && errors.email.message}
                type="email"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Put your password"
                className={` ${errors.password ? "input--error" : ""}`}
                disabled={isLoading}
                editable="string"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message: "Invalid Password",
                  },
                })}
                helpText={errors.password && errors.password.message}
              />
              <a
                href="#"
                className="login__forgot-link"
                // onClick={(e) => {
                //   e.preventDefault();
                //   if (!isLoading) setShowForgotPassword(true);
                // }}
              >
                Forgot password?
              </a>
            </div>

            <div className="login__secondary-info">
              <div className="login__button-wrapper">
                <Button className="auth">
                  Login{isLoading && <span className="loader"></span>}
                </Button>
              </div>
              <Link to="/signup" className=" form__sign-in-link">
                <span className="login__or-text">or</span> Sign Up
              </Link>
              <p className="login__policy">
                by become a paw player you agree to our{" "}
                <a href="#" className="login__link">
                  Terms of Services
                </a>{" "}
                and{" "}
                <a href="#" className="login__link">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* {showForgotPassword && (
        <ForgotPasswordModal
          email={email}
          onEmailChange={setEmail}
          onClose={() => setShowForgotPassword(false)}
        />
      )} */}
      <div>
        <Button className="secondary">
          <img src={google} alt="Google Icon" />
        </Button>
      </div>
    </div>
  );
};
