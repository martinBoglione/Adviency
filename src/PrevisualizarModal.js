import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modal.css";
import "./home.css";
import { useReactToPrint } from "react-to-print";

const PrevModal = (props) => {
  const { show, handleClose, items } = props;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lista Compra",
  });
  return (
    <Modal show={show} onHide={handleClose} class="modal-sm modal-dialog">
      <Modal.Body>
        <div className="inputs-container" ref={componentRef}>
          <div className="titulo">
            <h1>Comprar:</h1>
          </div>
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
        <Button className="btn btn-dark" onClick={handlePrint}>
          Imprimir
        </Button>

        <Button className="btn btn-danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrevModal;
