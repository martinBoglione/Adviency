import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modal.css";

const DuplicateModal = (props) => {
  const { show, handleClose, selectedItem, handleDuplicate, handleEditChange } =
    props;

  return (
    <Modal show={show} onHide={handleClose} class="modal-sm modal-dialog">
      <Modal.Body>
        <div className="inputs-container">
          <input
            className="input"
            type="text"
            maxLength="15"
            placeholder="Medias"
            value={selectedItem ? selectedItem.itemName : ""}
            onChange={(event) => handleEditChange(event, "itemName")}
          />
          <input
            className="input"
            type="number"
            placeholder="100"
            min="1"
            value={selectedItem ? selectedItem.itemPrecio : ""}
            onChange={(event) => handleEditChange(event, "itemPrecio")}
          />
          <input
            className="input"
            type="text"
            maxLength="15"
            placeholder="Lucas"
            value={selectedItem ? selectedItem.itemDestinatario : ""}
            onChange={(event) => handleEditChange(event, "itemDestinatario")}
          />

          <input
            className="input"
            type="text"
            placeholder="http://image..."
            value={selectedItem ? selectedItem.itemImagen : ""}
            onChange={(event) => handleEditChange(event, "itemImagen")}
            onFocus={(event) => event.target.select()}
          />

          <input
            className="input"
            type="number"
            min="1"
            max="99"
            placeholder="2"
            value={selectedItem ? selectedItem.itemCantidad : ""}
            onChange={(event) => handleEditChange(event, "itemCantidad")}
          />
        </div>
      </Modal.Body>
      <Modal.Footer id="modal-footer">
        <Button className="btn btn-success button" onClick={handleDuplicate}>
          Agregar
        </Button>
        <Button className="btn btn-danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DuplicateModal;
