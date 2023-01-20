import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modal.css";
import "./home.css";

const PrevModal = (props) => {
  const { show, handleClose, items } = props;

  return (
    <Modal show={show} onHide={handleClose} class="modal-sm modal-dialog">
      <div className="titulo">
        <h1>Comprar:</h1>
      </div>
      <Modal.Body>
        <div className="inputs-container">
          {items.length === 0 ? (
            <p>¡No hay regalos, Grinch!</p>
          ) : (
            <ul>
              {items.map((item) => (
                <div className="container-lista" key={item.id}>
                  <li className="elemento-lista">
                    <img
                      className="item-imagen"
                      src={item.itemImagen}
                      alt="imagen"
                    />
                    <div>
                      <div className="items">
                        <span>{item.itemName}</span>
                        <span>
                          {"("}
                          {item.itemCantidad}
                          {")"}
                        </span>
                        <span>{"-"}</span>
                        <span>
                          {"$"}
                          {item.itemPrecioXCantidad}
                        </span>
                      </div>

                      <span className="item-destinatario">
                        {item.itemDestinatario}
                      </span>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer id="modal-footer">
        <Button className="btn btn-danger button-close" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrevModal;
