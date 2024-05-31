'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Footer = () => {
  const { theme, setTheme } = useTheme()
  const [mode, setMode] = useState('Light 光')

  useEffect(() => {
    setMode(theme === 'dark' ? 'Light 光' : 'Dark 暗')
  }, [theme])

  return (
    <footer className="py-2">
      <p className="text-sm text-zinc-500">
        <span>
          <a href="https://vercel.com/" target="_blank">Powered by Vercel</a>
        </span>{' '}
        <span className="mx-1 op75">· </span>
        <button onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}>{mode}</button>
      </p>
    </footer>
  );
}

export default Footer;
