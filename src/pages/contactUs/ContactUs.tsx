import { useState } from "react";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer, Slide } from "react-toastify";
import "./ContactUs.css";
import dogImage from "../../imgs/dog-contactus.png";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsLoading(true);
    console.log("Message sent:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    reset();
    toast.success("Message sent");
    // Aquí puedes conectar con un endpoint real o servicio de backend si lo deseas
  };

  return (
    <div className="login color-brown-dark">
      <div className="login__modal margin-top">
        <div className="login__image-container">
          <img
            src={dogImage || "/placeholder.svg"}
            alt="Dog with glasses using a laptop"
            className="login__image"
          />
        </div>
        <div className="login__content">
          <h1 className="login__title">PawPlay</h1>
          <h2 className="login__subtitle">
            Leave your paw print! Write to us and let's create some buzz.
          </h2>

          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login__form-group">
              <Input
                label="Your Name"
                placeholder="Put your name"
                editable="string"
                disabled={isLoading}
                {...register("name", { required: "Name is required" })}
                helpText={errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Put your email"
                editable="string"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                helpText={errors.email?.message}
              />
              <Input
                label="Message"
                placeholder="Write your message"
                editable="string"
                disabled={isLoading}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                })}
                helpText={errors.message?.message}
              />
            </div>

            <div className="login__secondary-info">
              <div className="login__button-wrapper">
                <Button className="send">Send</Button>
                <ToastContainer transition={Slide} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
