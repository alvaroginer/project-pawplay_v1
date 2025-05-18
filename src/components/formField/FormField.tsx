import { Input } from "../input/Input";
import { InputProps } from "../../types";
import "./FormField.css";

interface FormFieldProps {
  iconSrc: string;
  iconAlt: string;
  label: string;

  placeholder: InputProps["placeholder"];
  onChange: InputProps["onChange"];
  editable: InputProps["editable"];
  selectData?: InputProps["selectData"];
  value?: InputProps["value"];
}

export const FormField = (props: FormFieldProps) => {
  const {
    iconSrc,
    iconAlt,
    label,
    placeholder,
    onChange,
    editable,
    selectData,
    value,
  } = props;

  return (
    <div className="profile-field">
      <div className="profile-field__img">
        <img className="profile-field__icon" src={iconSrc} alt={iconAlt} />
      </div>
      <div className="profile-field__content">
        <h4 className="profile-field__label">{label}</h4>
        <div className="profile-field__input-container">
          <Input
            placeholder={placeholder}
            onChange={onChange}
            editable={editable}
            selectData={selectData}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};
