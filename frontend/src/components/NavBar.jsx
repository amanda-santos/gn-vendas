import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavBar() {
  return (
    <>
      <Navbar bg="success" variant="dark">
        <Navbar.Brand href="#home">Gn Vendas</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Produtos</Nav.Link>
          <Nav.Link href="/products/new">Cadastrar Novo Produto</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavBar;
