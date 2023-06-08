import { isAdult } from "../../utils/form/isAdult";
import { isEmailValid } from "../../utils/form/isEmailValid";
import { isOnlyLetters } from "../../utils/form/isOnlyLetters";
import { isValidDate } from "../../utils/form/isValidDate";

const requiredError = (value: string) => {
  if (value.trim() === "") {
    return "Field is required";
  }
  return false;
};

const newIsEmailValid = (value: string) => {
  if (!isEmailValid(value)) {
    return "Email not valid";
  }

  return false;
};

const requiredOnlyLetters = (value: string) => {
  if (isOnlyLetters(value)) {
    return "Must have only letters";
  }
  return false;
};

const valideDate = (value: string) => {
  if (!isValidDate(value)) {
    return "not valid date";
  }
  return false;
};

const adultOnly = (value: string) => {
  if (!isAdult(value)) {
    return "U r not adult!";
  }
  return false;
};

export const validate: any = {
  name: [requiredError, requiredOnlyLetters],
  email: [requiredError, newIsEmailValid],
  bornDate: [requiredError, valideDate, adultOnly],
  _default: [() => false],
};
