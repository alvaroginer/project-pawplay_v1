import { useState, type FormEvent } from "react";
import { validateEmail } from "../../../utils/validation";
import { ForgotPasswordModalProps } from "../../../types";
import "./ForgotPasswordModal.css";

export const ForgotPasswordModal = ({
  email,
  onEmailChange,
  onClose,
}: ForgotPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar email antes de enviar
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulamos el envío del correo
      console.log("Recuperar contraseña para:", email);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mostrar mensaje de éxito
      setIsEmailSent(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {!isEmailSent ? (
          <div className="password-modal">
            <h3 className="password-modal__title">Recover your password</h3>
            <p className="password-modal__description">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <form className="password-modal__form" onSubmit={handleSubmit}>
              <div className="password-modal__form-group">
                <label
                  htmlFor="recovery-email"
                  className="password-modal__label"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="recovery-email"
                  className={`password-modal__input ${
                    emailError ? "password-modal__input--error" : ""
                  }`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    onEmailChange(e.target.value);
                    if (emailError && validateEmail(e.target.value)) {
                      setEmailError("");
                    }
                  }}
                  required
                  disabled={isLoading}
                />
                {emailError && (
                  <span className="password-modal__error">{emailError}</span>
                )}
              </div>

              <button
                type="submit"
                className="password-modal__button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="password-modal__spinner">
                    <div className="password-modal__spinner-circle"></div>
                  </div>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="password-modal">
            <h3 className="password-modal__title">Email sent</h3>
            <p className="password-modal__success-message">
              We've sent you an email to reset your password. See you back at
              Paw Play soon!
            </p>
            <button
              type="button"
              className="password-modal__button"
              onClick={onClose}
            >
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
