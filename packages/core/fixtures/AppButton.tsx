const APP_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

type AppButtonProps = {
  size: (typeof APP_BUTTON_SIZES)[number];
};

export default function AppButton({ size }: AppButtonProps) {
  return <button>{size}</button>;
}
