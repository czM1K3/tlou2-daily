"use client";
import { FC, useEffect, useState } from "react";

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
  const [date, setDate] = useState(new Date());
  const [seed, setSeed] = useState(getSeed(date));
  const [character, setCharacter] = useState(getCharacter(seed));
  
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
        value={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,"0")}-${date.getDate().toString().padStart(2,"0")}`}
        onChange={(e) => {
          setDate(new Date(e.target.value));
        }}
      />
    </>
  );
};
