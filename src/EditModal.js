import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./Modal.css";

const EditModal = (props) => {
  const { show, handleClose, selectedItem, handleEditChange, handleSaveEdit } =
    props;

  return (
    <Modal show={show} onHide={handleClose} class="modal-sm modal-dialog">
      <Modal.Body>
        <div className="inputs-container">
          <input
            className="input"
            type="text"
            maxLength="15"
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
            value={selectedItem ? selectedItem.itemDestinatario : ""}
            onChange={(event) => handleEditChange(event, "itemDestinatario")}
          />

          <input
            className="input"
            type="text"
            value={selectedItem ? selectedItem.itemImagen : ""}
            onChange={(event) => handleEditChange(event, "itemImagen")}
            onFocus={(event) => event.target.select()}
          />

          <input
            className="input"
            type="number"
            min="1"
            max="99"
            value={selectedItem ? selectedItem.itemCantidad : ""}
            onChange={(event) => handleEditChange(event, "itemCantidad")}
          />
        </div>
      </Modal.Body>
      <Modal.Footer id="modal-footer">
        <Button className="btn btn-success button" onClick={handleSaveEdit}>
          Guardar
        </Button>
        <Button className="btn btn-danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
