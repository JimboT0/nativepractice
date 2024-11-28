import { createContext, useContext } from 'react';

interface UIContextType {
  // Add any UI-related state that's causing circular dependencies
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isModalOpen: boolean;
  toggleModal: () => void;
  // Add other UI state as needed
}

export const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
} 