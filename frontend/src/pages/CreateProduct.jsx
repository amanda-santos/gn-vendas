import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import api from "../services/api";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const history = useHistory();

  async function handleNewProduct(e) {
    e.preventDefault();

    const data = {
      name,
      value,
    };

    try {
      await api.post("products", data);
      history.push("/products");
    } catch (err) {
      alert("Erro no cadastro. Tente novamente.");
    }
  }

  return (
    <div className="container">
      <br />
      <form onSubmit={handleNewProduct}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
              Nome
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            maxLength="255"
            name="name"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
              Valor R$
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            type="number"
            name="value"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </InputGroup>
        <Button variant="success" type="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
