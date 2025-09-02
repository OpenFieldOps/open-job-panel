import { useTranslation as useNotTypedTranslation } from "react-i18next";

type Selector<T, Expect = unknown> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${Selector<T[K], Expect>}` | K
    : T[K] extends Expect
    ? K
    : never;
}[keyof T & string];

type TranslationConfig = typeof import("../locales/en/translation.json");

type TranslationKey = Selector<TranslationConfig, string>;

export type TranslationKeyWithCategory<
  Category extends keyof TranslationConfig
> = `menu.${Selector<TranslationConfig[Category], string>}`;

export function useTranslation() {
  const { t } = useNotTypedTranslation();
  return {
    t: (key: TranslationKey) => t(key),
  };
}
