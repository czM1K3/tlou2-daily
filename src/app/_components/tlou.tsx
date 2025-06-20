"use client";
import { FC, useEffect, useState } from "react";
import Midnight from "./midnight";
import styles from "./tlou.module.scss";
import Image from "next/image";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const getSeed = (localDate: Date) => {
  return Math.floor(localDate.getTime() / (1000 * 60 * 60 * 24));
};

const characters = [
  "Ellie",
  "Abby",
  "Dina",
  "Joel",
  "Lev",
  "Tommy",
  "Yara",
  "Jesse",
  "Manny",
  "Mel",
  "Marlene",
  "Bill",
];

const getCharacter = (seed: number) => {
  const id = seed % characters.length;
  return characters[id];
}

export const Tlou: FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null)
  const [date, setDate] = useState(new Date());
  const [seed, setSeed] = useState(getSeed(date));
  const [character, setCharacter] = useState(getCharacter(seed));

  const addDays = (days: number) => {
    setDate((oldDate) => {
      const newDate = new Date(oldDate.valueOf());
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    })
  };

  useEffect(() => {
    setCurrentDate(new Date());
    // Update current date every 10 seconds
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const newSeed = getSeed(date);
    setSeed(newSeed);
    setCharacter(getCharacter(newSeed));
  }, [date]);

  return (
    <div className={styles.background}>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.first}`}>
          <div className={styles.logo}>
            <Image
              src="/logo.webp"
              alt="The Last of Us Part 2 - No Return Logo"
              width={1047}
              height={514}
            />
          </div> 
          <h2 className={styles.seed}>Seed: {seed}</h2>
          <div className={styles.date}>
            <MdKeyboardArrowLeft className={styles.button} onClick={() => addDays(-1)} />
            <input
              type="date"
              value={`${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2,"0")}-${date.getUTCDate().toString().padStart(2,"0")}`}
              onChange={(e) => {
                setDate(new Date(e.target.value));
              }}
            />
            <MdKeyboardArrowRight className={styles.button} onClick={() => addDays(1)} />
          </div>
          <div className={styles.today}>
            {currentDate && seed === getSeed(currentDate) && (
              <>
                <h3>Today</h3>
                <Midnight />
              </>
            )}
          </div>
        </div>
        <div className={`${styles.column} ${styles.second}`}>
          <h1 className={styles.test}>Character: {character}</h1>
          <div className={styles.characterImage}>
            <Image
              src={`/${character.toLowerCase()}_crop.webp`}
              alt={character}
              width={1000}
              height={800}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
