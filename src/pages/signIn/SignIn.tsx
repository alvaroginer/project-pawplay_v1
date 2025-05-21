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
import "./SignIn.css";

export const SignIn = () => {
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
        breed: "",
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
    <div className="signin-container">
      <main className="signin">
        <div className="signin__card">
          <div className="signin__image-container">
            <img
              src={dogImage || "/placeholder.svg"}
              alt="Dog with glasses using a laptop"
              className="signin__image"
            />
          </div>
          <div className="signin__form-container">
            <div className="signin__form-content">
              <h1 className="signin__title">PawPlay</h1>
              <h2 className="signin__subtitle">Become a PawPlayer</h2>

              <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="signin__form-group">
                  <Input
                    label="Your name"
                    placeholder="Put your name"
                    className={errors.name ? "signin__input--error" : ""}
                    editable="string"
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
                </div>
                <div className="signin__form-group">
                  <Input
                    label="Your last name"
                    placeholder="Put your last name"
                    editable="string"
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
                </div>
                <div className="signin__form-group">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Put your email"
                    editable="string"
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
                </div>
                <div className="signin__form-group">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Put a strong password"
                    editable="string"
                    className={errors.password ? "signin__input--error" : ""}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                        message:
                          "Must include 8+ chars, upper & lower case, number, and symbol.",
                      },
                    })}
                    helpText={errors.password && errors.password.message}
                  />
                </div>
                <button
                  type="submit"
                  className="form__button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="spinner">
                      <div className="spinner__circle"></div>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
            </div>

            <div className="signin__actions">
              <div className="signin__login">
                <p>
                  <span>or</span>{" "}
                  <Link to="/login" className="signin__login-link">
                    Log in
                  </Link>
                </p>
              </div>

              <footer className="signin__footer">
                <p className="signin__footer-text">
                  By become a paw player you agree to our{" "}
                  <Link to="service" className="signin__footer-link">
                    Terms of Services
                  </Link>{" "}
                  and{" "}
                  <Link to="privacy" className="signin__footer-link">
                    Privacy Policy
                  </Link>
                </p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
