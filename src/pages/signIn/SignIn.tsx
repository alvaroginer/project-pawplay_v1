import { useState, useContext, type FormEvent } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { Input } from "../../components/input/Input";
import { validateEmail, validatePassword } from "../../utils/validation";
import { FormData, FormErrors, UserData } from "../../types";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import dogImage from "../../imgs/loginImage.png";
import "./SignIn.css";

export const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validaciones más compactas
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) newErrors.name = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";

    if (!formData.email) {
      newErrors.email = "Required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid";
    }

    if (!formData.password) {
      newErrors.password = "Required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Min 8 chars";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Mostrar errores solo cuando se intenta enviar el formulario
    setShowErrors(true);

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        //FireBase verification
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;
        const uidKey = user.uid;

        //create new doc in user collection

        const usersRef = collection(db, "users");
        const newUserRef = doc(usersRef, uidKey);
        const userData: UserData = {
          uid: uidKey,
          mail: formData.email,
          name: formData.name,
          lastName: formData.lastName,
          profiles: [],
        };

        await setDoc(newUserRef, userData);

        //Updating useContext
        login(userData);

        //Faltaria actualizar el useContext de AuthContext

        console.log("User created with UID:", uidKey);
        console.log("Firestore document ID:", newUserRef.id);
      } catch (error) {
        console.error("SignIn error:", error);
      }
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate("/");
      }, 1500);
    }
  };

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

              <form className="signin__form" onSubmit={handleSubmit}>
                <div className="signin__form-group">
                  <Input
                    name="name"
                    label="Your name"
                    placeholder="Put your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={
                      errors.name && showErrors ? "signin__input--error" : ""
                    }
                    editable="string"
                  />
                </div>
                <div className="signin__form-group">
                  <Input
                    name="lastName"
                    label="Your last name"
                    placeholder="Put your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    editable="string"
                    className={
                      errors.name && showErrors ? "signin__input--error" : ""
                    }
                  />
                </div>
                <div className="signin__form-group">
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Put your email"
                    value={formData.email}
                    onChange={handleChange}
                    editable="string"
                    className={
                      errors.email && showErrors ? "signin__input--error" : ""
                    }
                  />
                </div>
                <div className="signin__form-group">
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Put a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    editable="string"
                    className={
                      errors.password && showErrors
                        ? "signin__input--error"
                        : ""
                    }
                  />
                </div>
              </form>
            </div>

            <div className="signin__actions">
              <button
                type="submit"
                className="form__button"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className="spinner">
                    <div className="spinner__circle"></div>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="signin__login">
                <span>or</span>{" "}
                <Link to="/login" className="signin__login-link">
                  Log in
                </Link>
              </div>

              <footer className="signin__footer">
                <p className="signin__footer-text">
                  By become a paw player you agree to our
                  <Link to="service" className="signin__footer-link">
                    {" "}
                    Terms of Services
                  </Link>{" "}
                  and
                  <Link to="privacy" className="signin__footer-link">
                    {" "}
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
