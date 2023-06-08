import React, { FC, memo } from "react";
import { IFields } from "../../utils/form/FormTypes";

interface IInput {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: keyof IFields;
  placeholder?: string;
  error: string | null;
  label?: string;
  className?: string;
}

export const Checkbox: FC<IInput> = memo(
  ({
    name,
    checked = false,
    onChange,
    placeholder = "",
    error = null,
    label = "",
    className = "",
  }) => {
    return (
      <>
        <label className={className}>
          {label && <span style={{ userSelect: "none" }}>{label}</span>}
          <input
            checked={checked}
            onChange={onChange}
            type="checkbox"
            name={name}
            placeholder={placeholder}
          />
        </label>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </>
    );
  },
  (prevState, nextProps) => {
    if (
      prevState.checked !== nextProps.checked ||
      prevState.error !== nextProps.error
    ) {
      return false;
    } else {
      return true;
    }
  }
);

Checkbox.displayName = "Checkbox";
