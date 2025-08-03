"use client";
import { useEffect, useState } from "react";
import { StarsBackground } from "./animate-ui/backgrounds/stars";
import { useTheme } from "next-themes";
export default function StarBack() {
  const { theme } = useTheme();
  console.log("THEME", theme);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(!open);
  }, [theme]);

  return (
    <>
      {open && (
        <StarsBackground className="absolute h-[160vh] flex items-center justify-center rounded-xl" />
      )}
    </>
  );
}
