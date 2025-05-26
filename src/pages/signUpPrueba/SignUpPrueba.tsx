import { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Input } from "../../components/input/Input";
import { SignInData, ProfileData, UserData } from "../../types";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { useForm, SubmitHandler } from "react-hook-form";
import { db } from "../../dataBase/firebase";
import dogImage from "../../imgs/loginImage.png";
import arrow from "../../imgs/profilePage/arrow-left.svg";
import { Button } from "../../components/button/Button";
import "./SignUpPrueba.css";

export const SignUpPrueba = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInData>();

  const onSubmit: SubmitHandler<SignInData> = async (formData) => {
    //Activamos spinner
    setIsSubmitting(true);

    try {
      //FireBase verification
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Manually define UID for users
      const user = userCredential.user;
      const uidKey = user.uid;

      // Manually define ID for profile
      const profileRef = collection(db, "profiles");
      const newProfileRef = doc(profileRef);

      //create new doc in user collection
      const usersRef = collection(db, "users");
      const newUserRef = doc(usersRef, uidKey);
      const userData: UserData = {
        uid: uidKey,
        mail: formData.email,
        name: formData.name,
        lastName: formData.lastName,
        profiles: [newProfileRef.id],
      };

      await setDoc(newUserRef, userData);

      //Create new doc in profiles collection
      const profileData: ProfileData = {
        userUid: uidKey,
        id: newProfileRef.id,
        profileName: "",
        profilePhoto: "",
        profileBio: "",
        age: null,
        breed: "",
        size: null,
        gender: null,
        likedEvents: [],
      };

      await setDoc(newProfileRef, profileData);

      //Updating useContext
      login(userData, profileData);

      console.log("User created with UID:", uidKey);
      console.log("Profile created with ID:", newProfileRef);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        console.log(`Firebase error (${error.code}): ${error.message}`);
        setError("email", {
          type: "manual",
          message: "This email is already registered.",
        });
        setIsSubmitting(false);
        return;
      }
    }
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  console.log("Form errors:", errors);

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
                label="Your name"
                placeholder="Put your name"
                className={errors.name ? "signin__input--error" : ""}
                editable="string"
                disabled={isSubmitting}
                charLimit={20}
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,20}$/,
                    message: "Only letters (2–20 characters)",
                  },
                })}
                helpText={errors.name && errors.name.message}
              />
              <Input
                label="Your last name"
                placeholder="Put your last name"
                editable="string"
                disabled={isSubmitting}
                className={errors.lastName ? "signin__input--error" : ""}
                {...register("lastName", {
                  required: "Last name is required",
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]{2,20}$/,
                    message: "Only letters (2–20 characters)",
                  },
                })}
                helpText={errors.lastName && errors.lastName.message}
                charLimit={20}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Put your email"
                editable="string"
                disabled={isSubmitting}
                className={errors.email ? "signin__input--error" : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                helpText={errors.email && errors.email.message}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Put a strong password"
                editable="string"
                disabled={isSubmitting}
                className={errors.password ? "signin__input--error" : ""}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    message:
                      "Must include 8+ chars, upper & lower case, number, and symbol.",
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
                <Button className="auth">Sing Up</Button>
              </div>

              <Link to="/signin" className=" form__sign-in-link">
                <span className="login__or-text">or</span> Log in
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
