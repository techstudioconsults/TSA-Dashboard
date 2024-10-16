import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface LogoProperties {
  logo: string;
}

type Variant =
  | "default"
  | "primary"
  | "destructive"
  | "subtle"
  | "loading"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type Size = "default" | "sm" | "lg" | "link" | "icon" | "circle";
export interface TsaButtonProperties {
  type?: "submit" | "button" | "reset";
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
  isLoading?: boolean;
  isIconOnly?: boolean;
  isLeftIconVisible?: boolean;
  isRightIconVisible?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface TsaInputProperties {
  label?: string;
  isRequired?: boolean;
  state?: "default" | "primary" | "error";
  name?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  className?: string;
  helpText?: string;
  validate?: (value: string) => boolean;
}

export interface TsaNavbarProperties {
  navLinks: NavLink[];
  logoPath: string;
  children?: ReactNode;
  bgScrollColor?: string;
  linkClassName?: string;
  className?: string;
  showBanner?: boolean;
  bannerDuration?: string;
}

export interface courseContentProperties {
  name: string;
  image: string;
  link: string;
}

type DropdownItem = {
  title: string;
  href: string;
  description: string;
};

export interface NavLink {
  route: string;
  link: string;
  dropdown?: DropdownItem[];
}

export interface TeamProperties {
  image: string;
  name: string;
  role: string;
  linkedIn: string;
}
