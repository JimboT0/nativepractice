import { createContext, useContext } from 'react';

interface AppThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppThemeContext = createContext<AppThemeContextType | undefined>(undefined);

export function useAppTheme() {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
} 