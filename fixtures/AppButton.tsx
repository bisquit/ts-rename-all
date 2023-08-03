type AppButtonProps = {
  size: string;
};

export default function AppButton({ size }: AppButtonProps) {
  return <button>{size}</button>;
}
