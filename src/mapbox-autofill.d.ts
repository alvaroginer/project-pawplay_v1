declare module "@mapbox/search-js-react" {
  import * as React from "react";

  export interface AddressAutofillProps
    extends React.HTMLAttributes<HTMLDivElement> {
    accessToken: string;
    onRetrieve?: (event: any) => void;
    children?: React.ReactNode;
  }

  export const AddressAutofill: React.FC<AddressAutofillProps>;
}
