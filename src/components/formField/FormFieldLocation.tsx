import { AddressAutofill } from "@mapbox/search-js-react";
import {
  FieldErrors,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { CreateEventProps } from "../../types";
import { GeoPoint } from "firebase/firestore";
import locationIcon from "../../imgs/eventPage/location.svg";

type FormFieldLocationProps = {
  label: Path<CreateEventProps>;
  register: UseFormRegister<CreateEventProps>;
  setValue: UseFormSetValue<CreateEventProps>;
  required: boolean;
  errors: FieldErrors<CreateEventProps> | undefined;
};

export const FormFieldLocation = ({
  label,
  register,
  required,
  errors,
  setValue,
}: FormFieldLocationProps) => {
  return (
    <div className="profile-field">
      <div className="profile-field__img">
        <img
          className="profile-field__icon"
          src={locationIcon}
          alt="Location Icon"
        />
      </div>
      <div className="profile-field__content">
        <h4 className="profile-field__label">Location</h4>
        <div className="profile-field__input-container">
          <div style={{ width: "100%" }}>
            <AddressAutofill
              style={{ display: "block", width: "100%" }}
              accessToken="pk.eyJ1IjoiYWdpbmVyIiwiYSI6ImNtYm5mcjVuZTFnb3YyanBqaTZkcTUwNW0ifQ.8Xfzx_-MoX4V_uvM_Hhtkw"
              onRetrieve={async (e) => {
                try {
                  console.log("se ejecuta el onretrieve");
                  const feature = e.features?.[0];
                  console.log("comprobamos feature", feature);
                  if (!feature) return;

                  const address = feature.properties.full_address;
                  const [lon, lat] = feature.geometry.coordinates;
                  const coordinates = new GeoPoint(lat, lon);

                  setValue("location.address", address);
                  setValue("location.coordinates", coordinates);
                } catch {
                  console.error("on retrieve did not work");
                }
              }}
            >
              <input
                id="location"
                type="text"
                placeholder="Put the address of the event"
                autoComplete="address-line1"
                className={`input width-100 ${errors ? "input--error" : ""}`}
                {...register(label, { required })}
              />
            </AddressAutofill>
          </div>
          {errors && (
            <div className="input--help-text__container">
              <p className="input--help-text input--help-text__error">
                This field is necessary
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
