import { AddressAutofill } from "@mapbox/search-js-react";
import { FieldErrors, Path, UseFormRegister } from "react-hook-form";

// import { useFormContext, useController } from "react-hook-form";
// import { GeoPoint } from "firebase/firestore";
import locationIcon from "../../imgs/eventPage/location.svg";
import { CreateEventProps } from "../../types";

type FormFieldLocationProps = {
  label: Path<CreateEventProps>;
  register: UseFormRegister<CreateEventProps>;
  required: boolean;
  errors: FieldErrors<CreateEventProps> | undefined;
};

export const FormFieldLocation = ({
  label,
  register,
  required,
  errors,
}: FormFieldLocationProps) => {
  // const handleRetrieve = (e: any) => {
  //   const feature = e.features?.[0];
  //   if (!feature) return;

  //   const address = feature.place_name;
  //   const [lng, lat] = feature.geometry.coordinates;

  //   onChange({
  //     address,
  //     coordinates: new GeoPoint(lat, lng),
  //   });
  // };

  return (
    <div className='profile-field'>
      <div className='profile-field__img'>
        <img
          className='profile-field__icon'
          src={locationIcon}
          alt='Location Icon'
        />
      </div>
      <div className='profile-field__content'>
        <h4 className='profile-field__label'>Location</h4>
        <div className='profile-field__input-container'>
          <AddressAutofill accessToken='pk.eyJ1IjoiYWdpbmVyIiwiYSI6ImNtYm5mcjVuZTFnb3YyanBqaTZkcTUwNW0ifQ.8Xfzx_-MoX4V_uvM_Hhtkw'>
            <input
              id='location'
              type='text'
              placeholder='Put the address of the event'
              autoComplete='shipping address-line1'
              className={`input ${errors ? "input--error" : ""}`}
              {...register(label, { required })}
            />
          </AddressAutofill>

          {errors && (
            <div className='input--help-text__container'>
              <p className='input--help-text input--help-text__error'>
                This field is required
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
