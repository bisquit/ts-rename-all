export function validateChanged(value: string, oldValue: string) {
  if (value === oldValue) {
    return 'Not changed';
  }
}
