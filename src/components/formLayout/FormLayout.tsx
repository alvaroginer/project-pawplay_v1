import "../formLayout/FormLayout.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { FormLayoutProps } from "../../types";
import { useState } from "react";

export const FormLayout = (props: FormLayoutProps) => {
  const { title, fields, formData, onChange } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="form-container">
      <div className="form-container__content">
        <div className="form-container__image">
          <div className="info__image">
            <p className="info__image-title">
              Upload an image of the event location.
            </p>
            <label htmlFor="file-input" className="upload-button">
              Choose a file
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(file); // guardamos la imagen seleccionada
                }
              }}
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="image-preview"
              />
            )}
          </div>
        </div>
        <div className="form-container__elements">
          <p className="form-container__title">{title}</p>
          <div className="form-container__inputs">
            {fields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                placeholder={field.placeholder}
                onChange={onChange}
              />
            ))}
          </div>
          <div className="form-container__button">
            <Button className="primary">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
