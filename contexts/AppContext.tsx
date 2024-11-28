import { createContext } from 'react';

interface AppContextType {
  email: string | undefined;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined); 