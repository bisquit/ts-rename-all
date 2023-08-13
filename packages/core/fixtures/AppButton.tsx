const APP_BUTTON_SIZES = ['small', 'medium', 'large'] as const;
let APP_BUTTON_TYPES = ['button', 'submit'];
var APP_BUTTON_COLORS = ['primary', 'secondary'];

type AppButtonProps = {
  size: (typeof APP_BUTTON_SIZES)[number];
};

interface AppButtonOtherProps {
  type: (typeof APP_BUTTON_TYPES)[number];
}

export default function AppButton({ size }: AppButtonProps) {
  return <button>{size}</button>;
}
