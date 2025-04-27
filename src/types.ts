import { ReactNode } from "react";

// -----> Data of a created Event
export interface EventData {
  id: string;
  profileIDCreator: string;
  profileIdAsisstant: string[];
  eventPhoto: string[];
  eventDescription: string;
  dateTime: number;
  hour: number;
  location: string;
  places: number;
  activity: "outdoors" | "social event" | "private property" | "walks";
  breeds: string[];
}

// -----> Data of a Profile
export interface ProfileDate {
  id: string;
  profileName: string;
  profilePhoto: string;
  profileBio: string;
  age: number;
  breed: string;
  size: "small" | "medium" | "big" | "any";
  rating: RatingProps[];
  events: EventsProfileProps;
}

// -----> Data of a User, mainly acces data and profileIds
export interface UserData {
  id: string;
  mail: string;
  password: string;
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
  dogName: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  dogName?: string;
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

// -----> Event Page
export interface EventCategoryProps {
  img: string;
  title: string;
  info: string;
  fullWidth: boolean;
  editable: "string" | "select" | "";
  selectData?: SelectDataType;
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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Permite pasar clases adicionales
  disabled?: boolean;
  error?: string;
  type?: string;
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
  children?: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
}

/* ----- New Types ----- */

type SelectDataType =
  | typeof dogSizesType
  | typeof dogGenderType
  | typeof dogAgeType
  | typeof dogBreedsType;

// Sizes
export const dogSizesType = ["Small", "Medium", "Big", "Any"];

// Gender
export const dogGenderType = ["Male", "Female", "Other"];

// Age
export const dogAgeType = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

// Breeds
export const dogBreedsType = [
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
