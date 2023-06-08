export const isOnlyLetters = (string: string) => {
  return string.match(/[^a-zа-яё]/gi);
};
