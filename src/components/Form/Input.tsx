import React, { FC, memo } from "react";
import { IFields } from "../../utils/form/FormTypes";

interface IInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "password" | "checkbox";
  name: keyof IFields;
  placeholder?: string;
  error: string | null;
  label?: string;
  className?: string;
}

export const Input: FC<IInput> = memo(
  ({
    type = "text",
    name,
    value = "",
    onChange,
    placeholder = "",
    error = null,
    label = "",
    className = "",
  }) => {
    return (
      <label className={className}>
        {label && <span>{label}</span>}
        <input
          value={value}
          onChange={onChange}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </label>
    );
  },
  (prevState, nextProps) => {
    if (
      prevState.value !== nextProps.value ||
      prevState.error !== nextProps.error
    ) {
      return false;
    } else {
      return true;
    }
  }
);

Input.displayName = "Input";
