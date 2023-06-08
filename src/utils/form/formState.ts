import { FormFileds, FormsAction, IFormState } from "./FormTypes";

export const createFormInitialState = (): IFormState => {
  return {
    name: "",
    lastName: "",
    patronymic: "",
    bornDate: "",
    email: "",
    password: "",
    repeatPasswrod: "",
    agreement: false,
    errors: {},
  };
};

export const formReducer = (state: IFormState, action: FormsAction) => {
  switch (action.type) {
    case FormFileds.CHANGED_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case FormFileds.CHANGED_LAST_NAME: {
      return {
        ...state,
        lastName: action.payload,
      };
    }
    case FormFileds.CHANGED_PATRONYMIC: {
      return {
        ...state,
        patronymic: action.payload,
      };
    }
    case FormFileds.CHANGED_BORN_DATE: {
      return {
        ...state,
        bornDate: action.payload,
      };
    }
    case FormFileds.CHANGED_AGREEMENT: {
      return {
        ...state,
        agreement: !state.agreement,
      };
    }
    case FormFileds.CHANGED_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case FormFileds.CHANGED_PASSWORD: {
      return {
        ...state,
        password: action.payload,
      };
    }
    case FormFileds.CHANGED_REPEAT_PASSWORD: {
      return {
        ...state,
        repeatPasswrod: action.payload,
      };
    }
    case FormFileds.SETTED_ERRORS: {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message,
        },
      };
    }
    case FormFileds.RESETED_FIELD_ERROR: {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: null,
        },
      };
    }
    case FormFileds.RESETED_ERRORS: {
      return {
        ...state,
        errors: {},
      };
    }
  }
};
