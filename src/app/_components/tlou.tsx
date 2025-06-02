"use client";
import { FC, useEffect, useState } from "react";
import Midnight from "./midnight";

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
    <>
      <h1>{character}</h1>
      <h2>{seed}</h2>
      <input
        type="date"
        value={`${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2,"0")}-${date.getUTCDate().toString().padStart(2,"0")}`}
        onChange={(e) => {
          setDate(new Date(e.target.value));
        }}
      />
      <button onClick={() => addDays(-1)}>Previous</button>
      <button onClick={() => addDays(1)}>Next</button>
      {currentDate && seed === getSeed(currentDate) && (
        <div>
          <h3>Today</h3>
          <Midnight />
        </div>
      )}
    </>
  );
};
