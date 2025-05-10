import "../formLayout/FormLayout.css";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { FormLayoutProps } from "../../types";
import { useState } from "react";

export const FormLayout = (props: FormLayoutProps) => {
  const { title, fields, formData, imageTitle } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <div className="form">
      <div className="form__content">
        <div className="form__image-section">
          <div className="form__image-wrapper">
            {!selectedImage && (
              <div className="form__upload-instructions">
                <p className="form__image-title">{imageTitle}</p>
                <label htmlFor="file-input" className="form__upload-button">
                  Choose a file
                </label>
              </div>
            )}
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedImage(file);
                }
              }}
              className="form__file-input"
            />
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="form__image-preview"
              />
            )}
          </div>
        </div>

        <div className="form__elements">
          <p className="form__title">{title}</p>
          <div className="form__inputs">
            {fields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                placeholder={field.placeholder}
                onChange={field.onChange}
                editable={field.editable || ""}
                selectData={field.selectData}
              />
            ))}
          </div>
          <div className="container__button">
            <Button className="primary">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
