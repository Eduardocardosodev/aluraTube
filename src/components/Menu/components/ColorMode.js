import { createContext, useState } from 'react';

export const ColorModeContext = createContext({
  mode: '',
  setMode: () => {
    alert('Voce precisa me configurar primeiro');
  },
  toggleMode: () => {
    alert('Voce precisa me configurar primeiro');
  },
});

export const ColorModeProvider = ({ children, initialMode }) => {
  const [mode, setMode] = useState(initialMode);

  const toggleMode = () => {
    if (mode === 'dark') setMode('light');
    if (mode === 'light') setMode('dark');
  };

  return (
    <ColorModeContext.Provider
      value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};
