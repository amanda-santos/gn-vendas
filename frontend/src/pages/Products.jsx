import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

import api from "../services/api";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [purchase, setPurchase] = useState(null);

  const [nameErrors, setNameErrors] = useState(false);
  const [cpfErrors, setCpfErrors] = useState(false);
  const [phoneNumberErrors, setPhoneNumberErrors] = useState(false);

  const [showModalUserData, setShowModalUserData] = useState(false);
  const handleCloseModalUserData = () => setShowModalUserData(false);
  const handleShowModalUserData = () => setShowModalUserData(true);

  const [showModalFinishedPurchase, setShowModalFinishedPurchase] = useState(
    false
  );
  const handleCloseModalFinishedPurchase = () =>
    setShowModalFinishedPurchase(false);
  const handleShowModalFinishedPurchase = () =>
    setShowModalFinishedPurchase(true);

  useEffect(() => {
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  function handleClickPurchase(product) {
    setSelectedProduct({ ...product });
    handleShowModalUserData();
  }

  async function handleNewPurchase(e) {
    e.preventDefault();

    const data = {
      name,
      cpf,
      phone_number,
      product_name: selectedProduct.name,
      value: selectedProduct.value * 100,
    };

    try {
      await api.post("purchase", data).then((response) => {
        setPurchase(response.data);
      });
      handleCloseModalUserData();
      handleShowModalFinishedPurchase();
    } catch (err) {
      alert("Erro ao concluir a compra. Por favor, confira os seus dados e tente novamente.");
    }
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.value}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleClickPurchase(product)}
                >
                  Comprar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModalUserData} onHide={handleCloseModalUserData}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Compra</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleNewPurchase}>
          <Modal.Body>
            <p>Por favor, insira os seus dados para concluir a compra.</p>

            <span
              className="errors"
              style={{ display: nameErrors ? "flex" : "none" }}
            >
              Nome inválido.
            </span>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="name"
                placeholder="Nome completo"
                value={name}
                maxLength="255"
                onChange={(e) => setName(e.target.value)}
                onBlur={() =>
                  setNameErrors(
                    !/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/.test(
                      name
                    )
                  )
                }
                required
              />
            </InputGroup>

            <span
              className="errors"
              style={{ display: cpfErrors ? "flex" : "none" }}
            >
              CPF inválido.
            </span>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="cpf"
                placeholder="CPF (somente números)"
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
                onBlur={() =>
                  setCpfErrors(
                    cpf.length < 11 || cpf.length > 14 || !/^[0-9]*$/.test(cpf)
                  )
                }
                required
              />
            </InputGroup>

            <span
              className="errors"
              style={{ display: phoneNumberErrors ? "flex" : "none" }}
            >
              Número de telefone inválido.
            </span>
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="text"
                name="phone_number"
                placeholder="Número de Telefone (somente números - com DDD)"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() =>
                  setPhoneNumberErrors(
                    phone_number.length < 10 ||
                      phone_number.length > 11 ||
                      !/^[1-9]{2}9?[0-9]{8}$/.test(phone_number)
                  )
                }
                required
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalUserData}>
              Fechar
            </Button>
            <Button type="submit" variant="success" disabled={nameErrors || cpfErrors || phoneNumberErrors}>
              Concluir Compra
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={showModalFinishedPurchase}
        onHide={handleCloseModalFinishedPurchase}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Compra Concluída</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Sua compra foi concluída com sucesso! Obrigado por comprar conosco.
          </p>
          <p>
            <b>
              Você pode visualizar o seu boleto clicando no link abaixo:
              <br />
              <a
                target="_blank"
                rel="noreferrer"
                href={purchase && purchase.pdf_charge_link}
              >
                Boleto nº {purchase && purchase.charge_id}
              </a>
            </b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModalFinishedPurchase}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
