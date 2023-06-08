export enum FormFileds {
  CHANGED_NAME = "changed-name",
  CHANGED_LAST_NAME = "changed-lastName",
  CHANGED_PATRONYMIC = "changed-patronymic",
  CHANGED_BORN_DATE = "changed-bornDate",
  CHANGED_EMAIL = "changed-email",
  CHANGED_PASSWORD = "changed-password",
  CHANGED_REPEAT_PASSWORD = "changed-repeatPasswrod",
  CHANGED_AGREEMENT = "changed-agreement",
  SETTED_ERRORS = "setted-errors",
  RESETED_FIELD_ERROR = "reseted-field-error",
  RESETED_ERRORS = "reseted-errors",
}
export interface FormsAction {
  type: FormFileds;
  payload: any;
}
export interface IFields {
  name: string;
  lastName: string;
  patronymic: string;
  bornDate: string;
  email: string;
  password: string;
  repeatPasswrod: string;
  agreement: boolean;
}
export type ErrorsType = Record<keyof IFields, string>;

export interface IFormState extends IFields {
  errors: ErrorsType | Record<string, string>;
}
