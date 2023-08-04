type AppButtonProps = {
  size: string;
};

export default function AppButton2({ size }: AppButtonProps) {
  return <button>{size}</button>;
}
