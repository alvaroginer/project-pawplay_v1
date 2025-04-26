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
}

// -----> Forgot Password Modal
export interface ForgotPasswordModalProps {
  email: string;
  onEmailChange: (email: string) => void;
  onClose: () => void;
}
