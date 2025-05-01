import { useState, type FormEvent } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { validateEmail, validatePassword } from "../../utils/validation";
import { FormData, FormErrors } from "../../types";
import dogImage from "../../imgs/loginImage.png";
import { Link } from "react-router";

export const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dogName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!formData.dogName) newErrors.dogName = "Required";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mostrar errores solo cuando se intenta enviar el formulario
    setShowErrors(true);

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        alert("Login successful!");
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
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
                />
              </div>

              <div className="signin__form-group">
                <Input
                  name="dogName"
                  label="Your dog's name"
                  placeholder="Put the name of your dog"
                  value={formData.dogName}
                  onChange={handleChange}
                  className={
                    errors.dogName && showErrors ? "signin__input--error" : ""
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
                  className={
                    errors.password && showErrors ? "signin__input--error" : ""
                  }
                />
              </div>
            </form>
          </div>

          <div className="signin__actions">
            <Button
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              className="signin__button"
            >
              Sign in
            </Button>

            <div className="signin__login">
              <span>or</span>
              <Link to="login" className="signin__login-link">
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
  );
};
