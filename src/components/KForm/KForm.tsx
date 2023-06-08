import React, { useReducer } from "react";
import { FormFileds } from "../../utils/form/FormTypes";
import {
  createFormInitialState,
  formReducer,
} from "../../utils/form/formState";
import { Input } from "../Form/Input";
import { validate } from "./KFormValidate";
import styles from "../Form/Form.module.css";

export const KForm = () => {
  const [state, dispatch] = useReducer(
    formReducer,
    null,
    createFormInitialState
  );

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

    const formData = new FormData(e.target as HTMLFormElement);

    Array.from(formData.entries()).reduce((res, item) => {
      const [field, value] = item;

      const errors = (validate[field] || validate["_default"]).map(
        (validateFn: (value: string) => boolean) => validateFn(value as string)
      );

      const [firstError] = errors.filter((error: any) => error);

      if (firstError) {
        dispatch({
          type: FormFileds.SETTED_ERRORS,
          payload: { field, message: firstError },
        });
      }

      return {
        ...res,
        [field]: { errors },
      };
    }, {});
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
          value={state.email}
          name="email"
          placeholder="email"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_EMAIL)}
          error={state.errors?.["email"]}
        />

        <Input
          value={state.bornDate}
          name="bornDate"
          placeholder="bornDate"
          onChange={(e) => handleInput(e, FormFileds.CHANGED_BORN_DATE)}
          error={state.errors?.["bornDate"]}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};
