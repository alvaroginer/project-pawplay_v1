import { AddressAutofill } from "@mapbox/search-js-react";
import { useFormContext, useController } from "react-hook-form";
import { GeoPoint } from "firebase/firestore";
import locationIcon from "../../imgs/eventPage/location.svg";

export const FormFieldLocation = () => {
  const { control } = useFormContext();

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: "location",
    control,
    rules: {
      required: "This field is required",
    },
  });

  const handleRetrieve = (e: any) => {
    const feature = e.features?.[0];
    if (!feature) return;

    const address = feature.place_name;
    const [lng, lat] = feature.geometry.coordinates;

    onChange({
      address,
      coordinates: new GeoPoint(lat, lng),
    });
  };

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
          <AddressAutofill
            accessToken='pk.eyJ1IjoiYWdpbmVyIiwiYSI6ImNtYm5mcjVuZTFnb3YyanBqaTZkcTUwNW0ifQ.8Xfzx_-MoX4V_uvM_Hhtkw'
            onRetrieve={handleRetrieve}
          >
            <input
              id='location'
              type='text'
              placeholder='Put the address of the event'
              autoComplete='shipping address-line1'
              value={value?.address || ""}
              onChange={(e) => onChange({ ...value, address: e.target.value })}
              className={`input ${error ? "input--error" : ""}`}
            />
          </AddressAutofill>

          {error && (
            <div className='input--help-text__container'>
              <p className='input--help-text input--help-text__error'>
                {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
