export const isValidPassword = (password: string) => {
  return password
    .trim()
    .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
};
