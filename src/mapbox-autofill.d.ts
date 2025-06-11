declare module "@mapbox/search-js-react" {
  import * as React from "react";

  interface MapboxFeature {
    properties: {
      full_address: string;
      // otros campos que puedas necesitar
    };
    geometry: {
      coordinates: [number, number]; // [lon, lat]
    };
  }

  interface RetrieveEvent {
    features: MapboxFeature[];
  }

  export interface AddressAutofillProps
    extends React.HTMLAttributes<HTMLDivElement> {
    accessToken: string;
    onRetrieve?: (event: RetrieveEvent) => void;
    children?: React.ReactNode;
  }

  export const AddressAutofill: React.FC<AddressAutofillProps>;
}
