import React from "react";
import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";
import { GeoPoint } from "firebase/firestore";

// -----> Data of a created Event
export interface locationData {
  address: string;
  coordinates: GeoPoint;
}

export interface EventData {
  id: string;
  userUid: string;
  profileIdCreator: string;
  profileIdAsisstant?: string[];
  eventTitle: string;
  eventPhoto?: string;
  eventDescription: string;
  dateTime: Timestamp;
  location: locationData;
  places: number;
  size: "Small" | "Medium" | "Big" | "Any";
  activity: "Social events" | "Outdoors" | "Walks" | "Private property" | "Any";
  breeds: string;
}

// -----> Data of a Profile
export interface ProfileData {
  userUid: string;
  id: string;
  profileName?: string;
  profilePhoto?: string;
  profileBio?: string;
  age?: number;
  breed?: string;
  size?: "Small" | "Medium" | "Big" | "Any";
  gender?: "Male" | "Female" | "Not specify";
  likedEvents: string[];
}

// -----> Data of a User, mainly acces data and profileIds
export interface UserData {
  uid: string;
  mail: string;
  name: string;
  lastName?: string;
  profiles: string[];
}

// -----> Data of the events related with a Profile
export interface EventsProfileProps {
  eventsCreated: string[];
  eventsJoined: string[];
  eventsFavourite: string[];
}

// -----> Data of a Rating
export interface completeProfileRating {
  rating: oneRatingProps[];
}

export interface oneRatingProps {
  fromProfileId: string;
  value: number;
}

// -----> Form Data
export interface SignInData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LogInData {
  email: string;
  password: string;
}

/* ----- Components Props and Hooks Props ----- */

// -----> Buttons
export interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: (value: any) => void;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

// -----> Sidebar
export interface SidebarProps {
  filterParams: FilterProps;
  exitAnimation: boolean;
  onClick: (sidebarDisplay: boolean) => void;
  onChange: (category: string) => void;
  setDate: React.Dispatch<React.SetStateAction<DateFilterProps>>;
  dateFilterParams: DateFilterProps;
}

export interface FilterProps {
  activities: Record<string, boolean>;
  breeds: Record<string, boolean>;
  size: Record<string, boolean>;
}

export interface DateFilterProps {
  startDate: Date;
  endDate: Date | null;
}

export interface FilterCategoryProps {
  title: string;
  categories: Record<string, boolean>;
  onChange: (value: string) => void;
  children?: ReactNode;
}

// -----> Navigation Menu

export interface NavMenuProps {
  onClick: (value: boolean) => void;
}

// -----> Dots Menu

export interface DotsMenuProps {
  children: ReactNode;
  className: string;
}

// -----> Input
export interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  type?: string;
  helpText?: string;
  charLimit?: number;
  editable: "string" | "select" | "";
  selectData?: SelectDataType;
}

// -----> Forgot Password Modal
export interface ForgotPasswordModalProps {
  email: string;
  onEmailChange: (email: string) => void;
  onClose: () => void;
}

// -----> Warning Modal
export type WarningModalProps = {
  onClose: () => void;
  modalText: string;
  buttonText?: string;
  children?: ReactNode;
  className?: string;
  onConfirm?: () => void;
};

// -----> Accordion
export interface AccordionProps {
  text: string;
  profileId?: string;
  url?: string;
  eventsData: EventData[];
  isOpen?: boolean;
  defaultOpen?: boolean;
}

// -----> Event Page & Profile Page
interface dbProfileCategory {
  title: string;
  dbCategory: string;
}

export interface EventSignupProps {
  eventData: EventData | null;
  profiles: ProfileData[];
}

export interface EventUnregisterProps {
  eventData: EventData | null;
  profiles: ProfileData[];
}

export interface InfoCategoryProps {
  img?: string;
  reference: dbProfileCategory;
  info?: string;
  editable: "string" | "select" | "";
  selectData?: SelectDataType;
}

export interface UpdateInfoCategoryProps extends InfoCategoryProps {
  updateFunction: (referenceId: string) => void;
}

export interface EventCategoryBigProps {
  img: string;
  reference: dbProfileCategory;
  info: string;
  editable: boolean;
}

// -----> FormLayout

export interface FormLayoutProps {
  imageTitle: string;
  title: string;
  fields: InputProps[];
  formData: { [key: string]: string };
}

export interface CreateEventProps
  extends Omit<
    EventData,
    | "id"
    | "userUid"
    | "profileIdCreator"
    | "profileIdAsisstant"
    | "eventPhoto"
    | "places"
    | "dateTime"
  > {
  eventPhoto: File;
  places: string;
  day: string;
  time: string;
}

export interface CreateProfileProps
  extends Omit<ProfileData, "userUid" | "id" | "likedEvents" | "profilePhoto"> {
  profilePhoto: File;
}

export interface Field {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  editable: "string" | "select";
  selectData?: string[];
}

/* ----- New Types ----- */

type SelectDataType =
  | typeof dogSizesType
  | typeof dogGenderType
  | typeof dogAgeType
  | typeof dogBreedsType
  | typeof typeOfActivity
  | typeof maximumPlaces
  | typeof eventTime;

// TypeOfActivity
export const typeOfActivity = [
  "Social events",
  "Outdoors",
  "Walks",
  "Private property",
  "Any",
];

// MaximumPlaces
export const maximumPlaces = [
  "Any",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

// Sizes
export const dogSizesType = ["Small", "Medium", "Big", "Any"];

// Gender
export const dogGenderType = ["Male", "Female", "Not specify"];

// Age
export const dogAgeType = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

// Breeds
export const dogBreedsType = [
  "Any",
  "Akita",
  "Alaskan Malamute",
  "American Eskimo Dog",
  "Australian Cattle Dog",
  "Australian Shepherd",
  "Basset Hound",
  "Beagle",
  "Belgian Malinois",
  "Bernese Mountain Dog",
  "Bloodhound",
  "Border Collie",
  "Boston Terrier",
  "Boxer",
  "Bulldog",
  "Bull Terrier",
  "Cane Corso",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel",
  "Collie",
  "Dachshund",
  "Doberman Pinscher",
  "English Springer Spaniel",
  "French Bulldog",
  "German Shepherd",
  "Golden Retriever",
  "Great Dane",
  "Havanese",
  "Irish Setter",
  "Jack Russell Terrier",
  "Labrador Retriever",
  "Lhasa Apso",
  "Maltese",
  "Mastiff",
  "Miniature Schnauzer",
  "Newfoundland",
  "Old English Sheepdog",
  "Papillon",
  "Pekingese",
  "Pitbull",
  "Pomeranian",
  "Portuguese Water Dog",
  "Rhodesian Ridgeback",
  "Rottweiler",
  "Saint Bernard",
  "Samoyed",
  "Shiba Inu",
  "Shih Tzu",
  "Shetland Sheepdog",
  "Siberian Husky",
  "Staffordshire Bull Terrier",
  "Vizsla",
  "Weimaraner",
  "West Highland White Terrier",
  "Whippet",
  "Yorkshire Terrier",
];

export const eventTime = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const imageAllowedTypes = ["image/webp", "image/jpeg", "image/png"];
