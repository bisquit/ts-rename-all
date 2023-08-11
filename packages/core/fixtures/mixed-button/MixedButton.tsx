import { mixedButtonType } from './mixed_button_type';

type MixedButtonProps = {
  type?: (typeof mixedButtonType)[keyof typeof mixedButtonType];
};

export default function MixedButton({ type }: MixedButtonProps) {
  return <>{type}</>;
}
