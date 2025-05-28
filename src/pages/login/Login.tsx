import { useState, useContext } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { AuthContext } from "../../auth/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
//import { ForgotPasswordModal } from "../../components/modals/forgotPassword/ForgotPasswordModal";
import { LogInData, UserData } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import "./Login.css";
import dogImage from "../../imgs/dog-login.png";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import { getOneProfile } from "../../dataBase/services/readFunctions";

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

      const userSnap = await getDoc(doc(db, "users", uid));

      if (!userSnap.exists()) {
        console.warn("User not found");
        return;
      }

      const userData = userSnap.data() as UserData;

      const firstProfileSnap = await getOneProfile(userData.uid);
      if (!firstProfileSnap) {
        console.warn("Profile not found");
        return;
      }

      //Falta logear el perfil, habrá que seleccionar el último que se escogió
      login(userData, firstProfileSnap);

      //Actualizar useState/useContext de LogIn
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

  return (
    <div className="login">
      <div className="login__arrow-container">
        <img
          className="login__arow"
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
                className={`${errors.email ? "form__input--error" : ""}`}
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
                className={` ${errors.password ? "form__input--error" : ""}`}
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
                <Button className="auth">Login</Button>
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
    </div>
  );
};
