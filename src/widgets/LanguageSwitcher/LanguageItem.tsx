import s from "./styles.module.scss";
import { languages } from "@/widgets/LanguageSwitcher/LanguageSwitcher";
import { FC } from "react";
import * as api from "@/shared/api";

interface LanguageItemProps {
  language: api.T_Localization_Language,
  setActiveLanguage: (language: api.T_Localization_Language) => void;
  setLanguagesListVisibility: (isVisible: boolean) => void;
}

export const LanguageItem: FC<LanguageItemProps> = (props) => {
  const setLanguage = () => {
    props.setLanguagesListVisibility(false);
    //const activeLanguage = languages.filter((item) => item.id === props.id)[0];
    props.setActiveLanguage(props.language);
  };

  return (
    <div className={s.languages_list_item} onClick={setLanguage}>
      <h4 className={s.languages_list_item_title}>{props.language._name}</h4>
    </div>
  );
};
