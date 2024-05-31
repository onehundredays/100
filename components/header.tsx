'use client';

import { useRef, useEffect } from 'react';
import { animate } from '~/utils';

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (headerRef.current) {
      const texts = Array.from(headerRef.current.querySelectorAll('p'));
      texts.forEach((el) => {
        if (el.textContent!.trim().length > 0) {
          animate(el);
        }
      });
    }
  }, []);
  
  return (
    <header ref={headerRef} className="text-sm leading-relaxed">
      <p>Konv Suu</p>
      <p>Start at: May 30 2024</p>
    </header>
  )
}

export default Header
