import { createContext } from 'react';

type AppButtonContextValue = {
  title?: string;
};

export const AppButtonContext = createContext<AppButtonContextValue>({});
