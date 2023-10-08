import Image from "next/image";
import {
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  use,
  MouseEvent,
} from "react";
import s from "./styles.module.scss";
import {
  CoinButton,
  DiceButton,
  RPCButton,
  PokerButton,
  GamesIcon,
  ArrowIcon,
  SupportIcon,
} from "@/shared/SVGs";
import { useUnit } from "effector-react";
import * as SideBarModel from "./model";
import Discord from "@/public/media/social_media/Discord.svg";
import Twitter from "@/public/media/social_media/Twitter.svg";
import Telegram from "@/public/media/social_media/Telegram.svg";
import tgClosedSidebarIco from "@/public/media/sidebar_icons/TelegramIco.svg";
import Insta from "@/public/media/social_media/Insta.svg";
import { LanguageSwitcher } from "@/widgets/LanguageSwitcher/LanguageSwitcher";
import { settingsModel } from "@/entities/settings";

interface ClosedSideBarProps {
  pickedGame: number | null;
}
const ClosedSideBar: FC<ClosedSideBarProps> = (props) => {
  const [
    Localization
  ] = useUnit([
    settingsModel.$Localization
  ]);
  return (
    <>
      <div className={s.side_bar_upper}>
        <div>
          <div className={` ${s.games_button}`}>
            <GamesIcon />
          </div>
          <div className={s.buttons_holder}>
            <div
              className={`${s.button} ${props.pickedGame == 0 ? s.button_picked : ""
                }`}
            >
              <CoinButton />
              <div className={s.games_button_tooltip}>{Localization ? Localization.layout.sidebar.games.coinflip : ""}</div>
            </div>
            <div
              className={`${s.button} ${props.pickedGame == 1 ? s.button_picked : ""
                }`}
            >
              <DiceButton />
              <div className={s.games_button_tooltip}>{Localization ? Localization.layout.sidebar.games.dice : ""}</div>
            </div>
            <div
              className={`${s.button} ${props.pickedGame == 2 ? s.button_picked : ""
                }`}
            >
              <RPCButton />
              <div className={s.games_button_tooltip}>{Localization ? Localization.layout.sidebar.games.rps : ""}</div>
            </div>
            <div
              className={`${s.button} ${props.pickedGame == 3 ? s.button_picked : ""
                }`}
              onClick={() => { location.href = "/games/Poker" }}
            >
              <PokerButton />
              <div className={s.games_button_tooltip}>{Localization ? Localization.layout.sidebar.games.poker : ""}</div>
            </div>
            <div
              className={`${s.button} ${props.pickedGame == 3 ? s.button_picked : ""
                }`}
              onClick={() => { location.href = "https://t.me/greekkeepers" }}
            >
              <SupportIcon />
              <div className={s.games_button_tooltip}>
                {Localization ? Localization.layout.sidebar.support : ""}{" "}
                <Image className={s.tg_sidebar_ico} src={tgClosedSidebarIco} alt={""} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.side_bar_lower}></div>
    </>
  );
};

interface OpenedSideBarProps {
  pickedGame: number | null;
}
const OpenedSideBar: FC<OpenedSideBarProps> = (props) => {
  const [
    Localization
  ] = useUnit([
    settingsModel.$Localization
  ]);
  const [gamesAreOpen, setOpen] = useState(true);
  return (
    <>
      <div className={s.side_bar_upper}>
        <div className={s.upper_blocks}>
          <div
            className={`${s.buttons_menu} ${gamesAreOpen ? "" : s.buttons_menu_closed
              }`}
          >
            <div
              className={s.menu_header}
              onClick={() => {
                setOpen(!gamesAreOpen);
              }}
            >
              <div className={s.header_icon_container}>
                <GamesIcon />
                {Localization ? Localization.layout.sidebar.games._title : ""}
              </div>
              <div
                className={`${s.arrow} ${gamesAreOpen ? s.arrow_down : s.arrow_side
                  }`}
              >
                <ArrowIcon />
              </div>
            </div>
            <div className={s.game_rows}>
              <div className={`${s.game_row} ${s.picked_game_row}`}>
                <CoinButton />
                {Localization ? Localization.layout.sidebar.games.coinflip : ""}
              </div>
              <div className={s.game_row}>
                <DiceButton />
                {Localization ? Localization.layout.sidebar.games.dice : ""}
              </div>
              <div className={s.game_row}>
                <RPCButton />
                {Localization ? Localization.layout.sidebar.games.rps : ""}
              </div>
              <div className={s.game_row} onClick={() => { location.href = "/games/Poker" }}>
                <PokerButton />
                {Localization ? Localization.layout.sidebar.games.poker : ""}
              </div>
            </div>
          </div>
          <div className={s.support} onClick={() => { location.href = "https://t.me/greekkeepers" }}>
            <div className={s.icon_wrapper}>
              <SupportIcon />
            </div>
            <div className={s.large_header_text}>{Localization ? Localization.layout.sidebar.support : ""}</div>
          </div>
          <LanguageSwitcher />
          {/* <div className={s.language_settings}>
                </div> */}
        </div>
        <div className={s.lower_blocks}>
          <div className={s.social_networks}>
            {Localization ? Localization.layout.sidebar.socials : ""}
            <div className={s.icons}>
              <a
                href="https://discord.gg/ReJVd2xJSk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Discord} alt={""} width={30} height={30} />
              </a>
              <a
                href="https://twitter.com/GreekKeepers"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Twitter} alt={""} width={30} height={30} />
              </a>
              <a
                href="https://t.me/greekkeepers"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Telegram} alt={""} width={30} height={30} />
              </a>
              <a
                href="https://instagram.com/greekkeepers?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={Insta} alt={""} width={30} height={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={s.side_bar_lower}></div>
    </>
  );
};

export interface SideBarProps { }
export const SideBar: FC<SideBarProps> = (props) => {
  const [isOpen, currentPick] = useUnit([
    SideBarModel.$isOpen,
    SideBarModel.$currentPick,
  ]);

  return (
    <div
      className={`${s.side_bar} ${isOpen ? s.side_bar_opened : s.side_bar_closed
        }`}
    >
      {isOpen ? (
        <OpenedSideBar pickedGame={currentPick} />
      ) : (
        <ClosedSideBar pickedGame={currentPick} />
      )}
    </div>
  );
};
