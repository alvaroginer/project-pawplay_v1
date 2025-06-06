import { Controller, Control, RegisterOptions } from "react-hook-form";
import { Input } from "../input/Input";
import { InputProps } from "../../types";
import "./FormField.css";

interface FormFieldProps {
  iconSrc: string;
  iconAlt: string;
  label: string;
  placeholder: InputProps["placeholder"];
  editable: InputProps["editable"];
  selectData?: InputProps["selectData"];
  control: Control<any>;
  rules?: RegisterOptions;
  errors?: string;
  charLimit?: number;
  required?: boolean | string;
  name: string;
}

export const FormField = ({
  iconSrc,
  iconAlt,
  label,
  placeholder,
  editable,
  selectData,
  control,
  rules,
  errors,
  charLimit,
  name,
}: FormFieldProps) => {
  return (
    <div className='profile-field'>
      <div className='profile-field__img'>
        <img className='profile-field__icon' src={iconSrc} alt={iconAlt} />
      </div>

      <div className='profile-field__content'>
        <h4 className='profile-field__label'>{label}</h4>

        <div className='profile-field__input-container'>
          <Controller
            control={control}
            name={name}
            rules={rules}
            defaultValue=''
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder={placeholder}
                  editable={editable}
                  selectData={selectData}
                  name={name}
                  className={fieldState.error ? "input--error" : undefined}
                  helpText={errors}
                  charLimit={charLimit}
                />
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
