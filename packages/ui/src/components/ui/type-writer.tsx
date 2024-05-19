"use client";

import { ReactTyped } from "react-typed";

interface TypeWriterProps {
  strings: string[];
}

export default function TypeWriter({ strings }: TypeWriterProps) {
  return (
    <ReactTyped
      strings={strings}
      typeSpeed={80}
      backSpeed={20}
      backDelay={1000}
      loop
      cursorChar="|"
    />
  );
}