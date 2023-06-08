import React from "react";
import { TestInp } from "./TestInp";
import { publish } from "./event";

export const TestForm = () => {
  // const ref = useCallback((node: any) => {
  //   Array.from(node).map((child: any) => {
  //     console.log(child);
  //   });
  // }, []);

  const submit = (e: any) => {
    e.preventDefault();
    publish("custom:submiting");

    const obj: Record<string, FormDataEntryValue | null> = {};
    const formData = new FormData(e.target as HTMLFormElement);

    for (const key of formData.keys()) {
      obj[key] = formData.get(key);
    }

    console.log(obj);
    console.log("submit end");
  };

  return (
    <form onSubmit={submit}>
      <TestInp name="name" />
      <TestInp name="lastName" />
      <TestInp name="password" />
      <button type="submit">submit</button>
    </form>
  );
};
