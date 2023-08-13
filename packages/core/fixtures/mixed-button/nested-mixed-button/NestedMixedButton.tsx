import { mixedButtonType } from '../mixed_button_type';

type NestedMixedButtonProps = {
  type?: (typeof mixedButtonType)[keyof typeof mixedButtonType];
};

export default function NestedMixedButton({ type }: NestedMixedButtonProps) {
  return <>{type}</>;
}
