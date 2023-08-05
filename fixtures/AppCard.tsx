type AppCardProps = {
  size: string;
};

export default function AppCard({ size }: AppCardProps) {
  return <button>{size}</button>;
}
