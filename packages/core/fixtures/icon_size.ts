export const iconSize = {
  sm: 'sm',
  md: 'md',
} as const;
export type IconSize = (typeof iconSize)[keyof typeof iconSize];
