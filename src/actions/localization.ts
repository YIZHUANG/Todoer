import { LocaleTypes } from "src/types";

export const CHANGE_LOCALE = 'CHANGE_LOCALE';


export const changeLocale = (locale: LocaleTypes) => {
  return {
    type: CHANGE_LOCALE,
    locale
  }
}