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
              accessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
              onRetrieve={async (e) => {
                try {
                  console.log("se ejecuta el onretrieve", e);
                  const feature = e.features?.[0];
                  console.log("comprobamos feature", feature);

                  if (!feature) {
                    console.log("No feature found");
                    return;
                  }

                  const address = feature.properties?.full_address;
                  const coordinates = feature.geometry?.coordinates;

                  if (!address || !coordinates) {
                    console.log("Missing address or coordinates");
                    return;
                  }

                  const [lon, lat] = coordinates;
                  const geoPoint = new GeoPoint(lat, lon);

                  setValue("location.address", address);
                  setValue("location.coordinates", geoPoint);

                  console.log("Successfully set values:", {
                    address,
                    coordinates: geoPoint,
                  });
                } catch (error) {
                  console.error("Error in onRetrieve:", error);
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
