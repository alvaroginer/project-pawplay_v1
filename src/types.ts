import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";
import { FieldErrors } from "react-hook-form";

// -----> Data of a created Event
export interface EventData {
  id: string;
  userUid: string;
  profileIdCreator: string;
  profileIdAsisstant: string[];
  eventTitle: string;
  eventPhoto: string | null;
  eventDescription: string;
  dateTime: Timestamp;
  hour: number;
  location: string;
  places: number;
  size: "Small" | "Medium" | "Big" | "Any";
  activity: "Social events" | "Outdoors" | "Walks" | "Private property" | "Any";
  breeds: string;
}

// -----> Data of a Profile
export interface ProfileData {
  userUid: string;
  id: string;
  profileName: string;
  profilePhoto: string;
  profileBio: string;
  age: number | null;
  breed: string;
  size: "Small" | "Medium" | "Big" | "Any" | null;
  gender: "Male" | "Female" | "Not specify" | null;
  likedEvents: string[];
}

// -----> Data of a User, mainly acces data and profileIds
export interface UserData {
  uid: string;
  mail: string;
  name: string;
  lastName: string;
  profiles: string[];
}

// -----> Data of the events related with a Profile
export interface EventsProfileProps {
  eventsCreated: string[];
  eventsJoined: string[];
  eventsFavourite: string[];
}

// -----> Data of a Rating
export interface RatingProps {
  fromProfileId: string;
  value: number;
}

// -----> Form Data
export interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

/* ----- Components Props and Hooks Props ----- */

// -----> Buttons
export interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick?: (value: any) => void;
}

// -----> Sidebar
export interface SidebarProps {
  filterParams: FilterProps;
  exitAnimation: boolean;
  onClick: (sidebarDisplay: boolean) => void;
  onChange: (category: string) => void;
}

export interface FilterProps {
  activities: Record<string, boolean>;
  breeds: Record<string, boolean>;
  size: Record<string, boolean>;
  date: Record<number, boolean>;
}

export interface FilterCategoryProps {
  title: string;
  categories: Record<string, boolean>;
  onChange: (string: string) => void;
}

// -----> Navigation Menu

export interface NavMenuProps {
  onClick: (value: boolean) => void;
}

// -----> Input

export interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  className?: string; // Permite pasar clases adicionales
  disabled?: boolean;
  error?: string;
  type?: string;
  helpText?: string | FieldErrors<FormData>;
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

// -----> Accordion
export interface AccordionProps {
  text: string;
  eventTypes:
    | "upcoming events"
    | "hosted events"
    | "favourite events"
    | "past events";
  profileId: string;
  likedEvents: string[];
  isOpen?: boolean;
  defaultOpen?: boolean;
}

// -----> Event Page & Profile Page
export interface EventCategoryProps {
  img: string;
  title: string;
  info: string;
  editable: "string" | "select" | "";
  selectData?: SelectDataType;
}

export interface EventCategoryBigProps {
  img: string;
  title: string;
  info: string;
  editable: boolean;
}

// -----> FormLayout

export interface FormLayoutProps {
  imageTitle: string;
  title: string;
  fields: InputProps[];
  formData: { [key: string]: string };

  // onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
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
  | typeof maximumPlaces;

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
  "Other",
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
