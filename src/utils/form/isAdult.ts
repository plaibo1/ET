export const isAdult = (date: string, minAge = 18) => {
  const [day, month, year] = date.split(".");
  const dob = new Date(Number(year), Number(month) - 1, Number(day));

  const ageMs = Date.now() - dob.getTime();
  const age = ageMs / 1000 / 60 / 60 / 24 / 365;
  return age > minAge;
};
