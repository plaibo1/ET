import React, { useReducer } from "react";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { FormFileds } from "../../utils/form/FormTypes";
import {
  createFormInitialState,
  formReducer,
} from "../../utils/form/formState";
import styles from "./Form.module.css";
import { setRequiredError } from "../../utils/form/setRequiredError";
import { isEmailValid } from "../../utils/form/isEmailValid";
import { isValidDate } from "../../utils/form/isValidDate";
import { isAdult } from "../../utils/form/isAdult";
import { isOnlyLetters } from "../../utils/form/isOnlyLetters";
import { isValidPassword } from "../../utils/form/isValidPassword";

export const Form = () => {
  const [state, dispatch] = useReducer(
    formReducer,
    null,
    createFormInitialState
  );

  // [a-zа-яё]

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: FormFileds
  ) => {
    dispatch({
      type: FormFileds.RESETED_FIELD_ERROR,
      payload: e.target.getAttribute("name"),
    });

    dispatch({ type, payload: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;

    const obj: Record<string, FormDataEntryValue | null> = {};
    const formData = new FormData(e.target as HTMLFormElement);

    for (const key of formData.keys()) {
      obj[key] = formData.get(key);
      if (formData.get(key)?.toString().trim() === "") {
        setRequiredError({ dispatch, fieldName: key });
        isError = true;
      }
    }

    if (!obj.agreement) {
      setRequiredError({
        dispatch,
        fieldName: "agreement",
        message: "U must agree",
      });
      isError = true;
    }

    if (!isEmailValid(state.email)) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: { field: "email", message: "Email not valid" },
      });
      isError = true;
    }

    if (isValidDate(state.bornDate)) {
      if (!isAdult(state.bornDate)) {
        dispatch({
          type: FormFileds.SETTED_ERRORS,
          payload: { field: "bornDate", message: "u are not adult (18+)" },
        });
        isError = true;
      }
    } else {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: { field: "bornDate", message: "Not valid date" },
      });
      isError = true;
    }

    if (isOnlyLetters(state.name)) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: { field: "name", message: "Must contain only letters" },
      });
      isError = true;
    }

    if (isOnlyLetters(state.lastName)) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: { field: "lastName", message: "Must contain only letters" },
      });
      isError = true;
    }

    if (isOnlyLetters(state.patronymic)) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: { field: "patronymic", message: "Must contain only letters" },
      });
      isError = true;
    }

    if (!isValidPassword(state.password)) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: {
          field: "password",
          message: "min 8 characters, at least 1 Uppercase and 1 number",
        },
      });
      isError = true;
    }

    if (state.password !== state.repeatPasswrod) {
      dispatch({
        type: FormFileds.SETTED_ERRORS,
        payload: {
          field: "repeatPasswrod",
          message: "Пароли не совпадают",
        },
      });
      isError = true;
    }

    if (isError) return;

    console.log(obj);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          value={state.name}
          name="name"
          placeholder="name"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_NAME)}
          error={state.errors?.["name"]}
        />
        <Input
          value={state.lastName}
          name="lastName"
          placeholder="last name"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_LAST_NAME)}
          error={state.errors?.["lastName"]}
        />
        <Input
          value={state.patronymic}
          name="patronymic"
          placeholder="patronymic"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_PATRONYMIC)}
          error={state.errors?.["patronymic"]}
        />
        <Input
          value={state.bornDate}
          name="bornDate"
          placeholder="dd.mm.yyyy"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_BORN_DATE)}
          error={state.errors?.["bornDate"]}
        />
        <Input
          value={state.email}
          name="email"
          placeholder="email"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_EMAIL)}
          error={state.errors?.["email"]}
        />

        <Input
          value={state.password}
          name="password"
          placeholder="password"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_PASSWORD)}
          error={state.errors?.["password"]}
        />

        <Input
          value={state.repeatPasswrod}
          name="repeatPasswrod"
          placeholder="repeatPasswrod"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_REPEAT_PASSWORD)}
          error={state.errors?.["repeatPasswrod"]}
        />

        <Checkbox
          checked={state.agreement}
          name="agreement"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_AGREEMENT)}
          label="are u agree?"
          className={styles.checkbox}
          error={state.errors?.["agreement"]}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};
