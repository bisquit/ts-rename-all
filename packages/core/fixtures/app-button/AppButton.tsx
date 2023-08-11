import { useContext } from 'react';

import { AppButtonContext } from './AppButtonContext.js';

type AppButtonProps = {
  size?: string;
};

export default function AppButton({ size }: AppButtonProps) {
  const context = useContext(AppButtonContext);
  return <button {...context}>{size}</button>;
}
