'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function DarkLightToggle({ initialTheme, styles }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Update the state variable.
    // This causes the Sun/Moon icon to flip.
    setTheme(nextTheme);

    // Write the cookie for future visits
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    // Apply the new colors to the root HTML tag.
    const COLORS =
      nextTheme === 'light'
        ? LIGHT_TOKENS
        : DARK_TOKENS;

    const root = document.documentElement;

    root.setAttribute(
      'data-color-theme',
      nextTheme
    );

    for (const [key, value] of Object.entries(COLORS)) {
      root.style.setProperty(key, value);
    }
  }

  return (
    <button
      className={styles}
      onClick={handleClick}
    >
      {theme === 'light' ? (
        <Sun size="1.5rem" />
      ) : (
        <Moon size="1.5rem" />
      )}
    </button>
  );
}

export default DarkLightToggle
