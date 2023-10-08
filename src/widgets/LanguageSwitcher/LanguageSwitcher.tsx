import s from "./styles.module.scss";
import settingsIco from "@/public/media/sidebar_icons/settingsIcon.svg";
import downIco from "@/public/media/sidebar_icons/downIco.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageItem } from "@/widgets/LanguageSwitcher/LanguageItem";
import { FC } from "react";
import moonIco from "@/public/media/sidebar_icons/moonIco.svg";
import sunIco from "@/public/media/sidebar_icons/sunIco.svg";
import { settingsModel } from "@/entities/settings";
import { useUnit } from "effector-react";
import * as api from "@/shared/api";

export const languages = [
  {
    title: "English",
    id: "eng",
  },
  {
    title: "Russian",
    id: "rus",
  },
];

interface LanguageSwitcherProps { }

export const LanguageSwitcher: FC<LanguageSwitcherProps> = (props) => {
  const [
    Localization,
    getLocalization
  ] = useUnit([
    settingsModel.$Localization,
    settingsModel.getLocalization
  ]);
  const [activeLanguage, setActiveLanguage] = useState<api.T_Localization_Language>({
    _name: "English",
    _ref: "english"
  });
  const [languagesListVisibility, setLanguagesListVisibility] = useState(false);
  const [activeTheme, setActiveTheme] = useState("dark");

  const setListVisibility = () => {
    setLanguagesListVisibility(!languagesListVisibility);
  };

  const handleChangeTheme = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark");
  };

  const newActiveLanguage = (lang: api.T_Localization_Language) => {
    getLocalization(lang._ref);
    setActiveLanguage(lang);
  };

  // useEffect(() => {
  //   if(Localization && Localization.layout.sidebar.language._languages.find((value) => value._name == activeLanguage._name)){

  //   }
  //   getLocalization(activeLanguage._ref);
  // }, [activeLanguage]);

  useEffect(() => {
    if (Localization) {
      const lang = Localization.layout.sidebar.language._languages.find((value) => value._ref == activeLanguage._ref);
      console.log("lang", lang);
      setActiveLanguage(lang as any);
    }
  }, [Localization]);

  return (
    <div className={s.language_switcher_wrap}>
      <div className={s.language_switcher_title_block}>
        <Image alt="settings-ico" src={settingsIco} width={18} height={18} />
        <h2 className={s.language_switcher_title}>{Localization ? Localization.layout.sidebar.language._title : ""}</h2>
      </div>
      <div className={s.language_switcher_block}>
        <div className={s.language_switcher} onClick={setListVisibility}>
          <h3 className={s.active_language_title}>{activeLanguage._name}</h3>
          <Image alt="down-ico" src={downIco} width={9} height={5} />
        </div>
        <div
          className={`${s.languages_list} ${languagesListVisibility && s.visible
            }`}
        >
          {Localization &&
            Localization.layout.sidebar.language._languages.map((item, _) => (
              <LanguageItem
                setLanguagesListVisibility={setLanguagesListVisibility}
                setActiveLanguage={newActiveLanguage}

                key={item._name}
                language={item}
              />
            ))}
        </div>
      </div>
      <div className={s.theme_switcher_wrap}>
        <div className={s.themes_block}>
          <div
            className={`${s.theme_block} ${activeTheme === "dark" && s.active}`}
            onClick={handleChangeTheme}
          >
            <Image alt="moon-ico" src={moonIco} />
          </div>
          <div
            className={`${s.theme_block} ${activeTheme === "light" && s.active
              }`}
            onClick={handleChangeTheme}
          >
            <Image alt="sun-ico" src={sunIco} />
          </div>
        </div>
        <div className={s.active_theme_block}>
          <h2 className={s.active_theme_title}>{activeTheme}</h2>
          <span className={s.active_theme_subTitle}>Currently</span>
        </div>
      </div>
    </div>
  );
};
