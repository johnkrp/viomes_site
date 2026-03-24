export type NavChildLink = {
  name: string;
  href: string;
};

export type NavLink = {
  name: string;
  en: string;
  href: string;
  children?: NavChildLink[];
};

export type LanguageOption = {
  code: string;
  label: string;
};

export type BackgroundColorOption = {
  code: string;
  label: string;
  background: string;
  card: string;
  popover: string;
  muted: string;
  border: string;
  input: string;
  sidebar: string;
  sidebarAccent: string;
  sidebarBorder: string;
};

export type TextSecondaryColorOption = {
  code: string;
  label: string;
  foreground: string;
  primary: string;
  secondary: string;
  mutedForeground: string;
  ring: string;
  sidebarForeground: string;
};

export type TypographyOption = {
  code: string;
  label: string;
  sans: string;
  heading: string;
};

export type SizeOption = {
  code: string;
  label: string;
  scale: number;
};
