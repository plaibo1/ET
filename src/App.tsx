import React from "react";
import { Form } from "./components/Form/Form";
import { Table } from "./components/Table/Table";
import "./style.css";
import { TestForm } from "./components/TestForm/TestForm";
import { KForm } from "./components/KForm/KForm";

function App() {
  return (
    <div>
      <TestForm />
      <Table />
      <Form />
      <hr />
      <h2 style={{ textAlign: "center" }}>2nd implementation</h2>
      <KForm />
    </div>
  );
}

export default App;
