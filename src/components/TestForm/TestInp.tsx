/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useRef, useState } from "react";
import { subscribe, unsubscribe } from "./event";
import { isOnlyLetters } from "../../utils/form/isOnlyLetters";

export const TestInp = ({ name }: { name: string }) => {
  const inpRef = useRef<any>();
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState<string | boolean>(false);

  useEffect(() => {
    subscribe("custom:submiting", () => {
      if (inpRef.current.value.trim() === "") {
        setIsError("required");
      }

      if (isOnlyLetters(inpRef.current.value)) {
        setIsError("must have only letters");
      }

      console.log("================== input END ==================");
    });

    return () => {
      unsubscribe("custom:submiting", () => {
        console.log("unsubs");
      });
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name={name}
        value={value}
        ref={inpRef}
        onChange={onChange}
      />

      {isError && `error: ${isError}`}
    </div>
  );
};
