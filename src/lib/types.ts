export type Locale = "en" | "zh";

export type Localized<T = string> = Record<Locale, T>;
