import React from "react";
import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

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
  size: "large" | "medium" | "small";
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
  selectData?: string[];
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
interface dbProfileCategory {
  title: string;
  dbCategory: string;
}

export interface EventCategoryProps {
  img?: string;
  reference: dbProfileCategory;
  info?: string;
  editable: "string" | "select" | "";
  selectData?: SelectDataType;
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
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
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
