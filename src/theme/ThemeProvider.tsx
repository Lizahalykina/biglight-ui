import { createContext } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import type { ThemeName } from './themes';
import { themes } from './themes';

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider(props: { initialTheme?: ThemeName; children: ComponentChildren }) {
  const [theme, setTheme] = useState<ThemeName>(props.initialTheme ?? 'brandA');

  const style = useMemo(() => {
    const def = themes[theme];
    return def.cssVars as unknown as Record<string, string>;
  }, [theme]);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      <div data-theme={theme} style={style}>
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


