import { FormFileds, FormsAction } from "./FormTypes";

interface SetRequiredErrorType {
  fieldName: string;
  dispatch: (value: FormsAction) => void;
  message?: string | null;
}

export const setRequiredError = ({
  dispatch,
  fieldName,
  message = null,
}: SetRequiredErrorType) => {
  dispatch({
    type: FormFileds.SETTED_ERRORS,
    payload: { field: fieldName, message: message || "Field is requried!" },
  });
};
