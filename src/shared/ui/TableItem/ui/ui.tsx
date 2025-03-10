import { FC, useEffect, useState } from "react";
import styles from "./ui.module.scss";
import gameIco from "@/public/media/live_bets/mainPageActsGameIco.svg";
import linkIco from "@/public/media/live_bets/linkIco.svg";
import avatar from "@/public/media/player_icons/emptyAvatar.svg";
import Link from "next/link";
import * as api from "@/shared/api";
import { useMediaQuery } from "@/shared/tools";
import clsx from "clsx";
import appleIcon from "@/public/media/apples_icon/apple_icon.jpg";
import diceIcon from "@/public/media/live_bets/dice.svg";
import coinFlipIcon from "@/public/media/live_bets/coinFlip.svg";
import pokerIcon from "@/public/media/live_bets/poker.svg";
import rpsIcon from "@/public/media/live_bets/rps.svg";
import bombIcon from "@/public/media/live_bets/bomb.svg";
import plincoIcon from "@/public/media/live_bets/plinco.svg";
import { BlockiesAva } from "@/widgets/BlockiesAva/BlockiesAva";
import wheelIcon from "@/public/media/wheel_icons/wheel_icon.jpg";
import rocketIcon from "@/public/media/games_assets/rocket/rocket_icon.png";
import slotsIcon from "@/public/media/games_assets/slots/slots_icon.png";
export const TableItem: FC<IBetData> = (props) => {
  const isMedium = useMediaQuery("(max-width: 1280px)");
  const [gameImg, setGameImg] = useState(pokerIcon);
  const [avaSize, setAvaSize] = useState("30");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (screenWidth < 650) {
      setAvaSize("20");
    } else {
      setAvaSize("30");
    }
  }, [screenWidth]);

  useEffect(() => {
    if (props.game_name === "CoinFlip") {
      setGameImg(coinFlipIcon);
    } else if (props.game_name === "Dice") {
      setGameImg(diceIcon);
    } else if (props.game_name === "Mines") {
      setGameImg(bombIcon);
    } else if (props.game_name === "RockPaperScissors") {
      setGameImg(rpsIcon);
    } else if (props.game_name === "Poker") {
      setGameImg(pokerIcon);
    } else if (props.game_name === "Plinko") {
      setGameImg(plincoIcon);
    } else if (props.game_name === "Slots") {
      setGameImg(slotsIcon);
    } else if (props.game_name === "Rocket") {
      setGameImg(rocketIcon);
    } else if (props.game_name === "Wheel Fortune") {
      setGameImg(wheelIcon);
    } else if (props.game_name === "Apples") {
      setGameImg(appleIcon);
    }
  });
  return (
    <>
      <td className={styles.td}>
        <span>
          <Link
            href={props.trx_url}
            target="_blank"
            className={styles.link_block}
          >
            {/* <span className={styles.date}>{props.time.date}</span> */}
            <span className={styles.time}>{props.time.time}</span>
          </Link>
        </span>
      </td>
      <td className={styles.td}>
        <Link
          href={`/games/${props.game_name}`}
          target="_blank"
          className={styles.link_block}
        >
          <img
            src={gameImg.src}
            className={styles.game_ico}
            alt="game-ico-preview"
          />
          <span className={styles.game}>{props.game_name}</span>
        </Link>
      </td>
      <td className={styles.td}>
        <Link
          href={`/account/${props.player_address}`}
          target="_blank"
          className={styles.link_block}
        >
          <div className={styles.blockies_ava_wrap}>
            <BlockiesAva size={avaSize} address={props.ava_address} />
          </div>
          <span className={styles.player_name}>{props.player_name}</span>
        </Link>
      </td>
      <td className={styles.td}>
        <Link
          href={`/account/${props.player_address}`}
          target="_blank"
          className={styles.link_block}
        >
          {isMedium ? (
            <span className={styles.link_block}>
              <img
                src={linkIco.src}
                width={22}
                height={22}
                className={styles.linkIco}
              />
            </span>
          ) : (
            <span className={styles.address}>{`${props.player_address.slice(
              0,
              5
            )}...${props.player_address.slice(38, 42)}`}</span>
          )}
          {/* // TODO: Clear address explorer? @habdevs <img src={linkIco.src} width={22} height={22} />*/}
        </Link>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <img
            src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
            alt="wager-ico"
            className={styles.wagerIco}
          />
          <span className={styles.item_wager}>{props.wager}</span>
        </span>
      </td>
      <td className={styles.td}>
        <span className={styles.link_block}>
          <span className={styles.item_multiplier}>{props.multiplier}x</span>
        </span>
      </td>

      <td className={styles.td}>
        <span className={clsx(styles.link_block, styles.link_block_profit)}>
          <span className={styles.profit}>{props.profit}</span>
          <img
            src={`${api.BaseStaticUrl}/media/tokens/${props.token}.svg`}
            alt="wager-ico"
            className={styles.wagerIco}
          />
        </span>
      </td>
      <td className={clsx(styles.td, styles.td_mobile)}>
        <span className={styles.link_block}>
          <img
            src={linkIco.src}
            width={22}
            height={22}
            className={styles.linkIco}
          />
        </span>
      </td>
    </>
  );
};
