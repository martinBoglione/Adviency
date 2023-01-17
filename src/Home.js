import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "./home.css";
import "./Modal.css";
import EditModal from "./EditModal.js";
document.getElementsByTagName("div")[0].focus();

const Home = () => {
  const [items, setItems] = useState(() => {
    //------------------------------Empieza Local Storage ------------------------------------------//
    // Recupera el valor guardado
    const saved = localStorage.getItem("gifts");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  // Recupera los items de la localStorage al cargar la página
  useEffect(() => {
    const storedItems = localStorage.getItem("gifts");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []); // <-- esto es el segundo argumento de dependencia

  // Actualiza la localStorage cuando se modifica la lista de items
  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(items));
  }, [items]);

  //------------------------------ Termina Local Storage ------------------------------------------//

  const [name, setName] = useState(""); // Nombre del regalo
  const [destinatario, setDestinatario] = useState(""); // Persona a recibir el regalo
  const [cantidad, setCantidad] = useState(""); // Cantidad de regalos
  const enable = name.length > 0; // Si no se escribio nada en el input de name el boton de Agregar queda desabilitado
  const [error, setError] = useState(null); // Error al poner dos veces el mismo regalo
  const [imagen, setImagen] = useState(""); // Imagen del regalo
  const [show, setShow] = useState(false); // Modal
  const [precio, setPrecio] = useState("");
  const regalosSorpresa = [
    "Medias",
    "Pantalon",
    "Boxer",
    "Play 5",
    "Notebook",
    "Camiseta",
    "Pelota",
    "Perro",
    "Mouse",
    "Monitor",
  ];

  //------------------------------ API  ------------------------------------------//
  // En el caso de tener una API esto podria usarsa para traer la lista de regalos
  // const [loading, setLoading] = useState(true);
  // const [errorAPI, setErrorAPI] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("https://mi-api-url.com/regalos");
  //       const data = await response.json();
  //       setItems(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setErrorAPI(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //------------------------------ End API  ------------------------------------------//

  //------------------------------ Edit Modal ------------------------------------------//
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (event, field) => {
    setSelectedItem({
      ...selectedItem,
      [field]: event.target.value,
    });
  };

  const handleSaveEdit = () => {
    //Encuentra el index del item seleccionado en el array
    const index = items.findIndex((item) => item.id === selectedItem.id);

    // items[index].itemPrecio =
    //   items[index].itemPrecio * items[index].itemCantidad;
    // Crea una nueva array con el item updateado(?)
    const updatedItems = [
      ...items.slice(0, index),
      selectedItem,
      ...items.slice(index + 1),
    ];

    // Al editar el item el itemPrecio no se actualiza
    // updatedItems[index].itemPrecio = updatedItems[index].itemPrecio * updatedItems[index].itemCantidad;
    // Actualiza el state con el nuevo array
    setItems(updatedItems);

    // Actualiza la local storage
    localStorage.setItem("gifts", JSON.stringify(updatedItems));

    setShowEditModal(false);
  };
  //------------------------------ End Edit Modal ------------------------------------------//

  const handleDestinatario = (event) => {
    setDestinatario(event.target.value);
  };

  const handleImagen = (event) => {
    setImagen(event.target.value); // Podria hacer que si o si se tenga que insertar una imagen?
  };

  const handleChange = (event) => {
    setName(event.target.value.trim()); // Trim evita que se pueda agregar un regalo en blanco
  };

  const handleCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const handleSorpresa = () => {
    const numberRandom = Math.floor(Math.random() * regalosSorpresa.length);
    const regalo = regalosSorpresa[numberRandom];
    setName(regalo);
  };

  const handleShow = () => {
    setShow(true); // Mostrar modal
  };

  const handleClose = () => {
    setShow(false); // Cerar modal
  };

  const handlePrecio = (event) => {
    setPrecio(event.target.value);
  };

  const handleAdd = () => {
    //Si un regalo ya existe aparece el error, como se esta usando toLowerCase los regalos son case sensitive
    const existingItem = items.find(
      (item) => item.itemName.toLowerCase() === name.toLowerCase()
    );
    if (existingItem) {
      setError("¡Este regalo ya esta en la lista!");
      return;
    }

    const newItem = {
      id: items.length + 1,
      itemName: name,
      itemCantidad: cantidad,
      itemImagen: imagen,
      itemDestinatario: destinatario,
      itemPrecio: Number(precio) * Number(cantidad),
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
    setCantidad("");
    setError(null);
    setImagen("");
    setShow(false);
    setDestinatario("");
    setPrecio("");
  };

  const handleDelete = (id) => {
    const newList = items.filter((l) => l.id !== id);
    setItems(newList);
  };

  const deleteAll = () => {
    setItems([]);
    //El deleteAll deberia borrar los campos tambien?
    setName("");
    setCantidad("");
    setError(null);
    setImagen("");
    setDestinatario("");
    setPrecio("");
  };

  return (
    <div className="style center">
      <div className="titulo">
        <h1>Regalos:</h1>
      </div>
      <div>
        <button
          tabIndex="1"
          className="btn btn-success agregar-button"
          onClick={handleShow}
        >
          Agregar regalo
        </button>
        <EditModal
          show={showEditModal}
          handleClose={handleCloseEdit}
          selectedItem={selectedItem}
          handleEditChange={handleEditChange}
          handleSaveEdit={handleSaveEdit}
        />
        <Modal class="modal-sm modal-dialog" show={show}>
          <Modal.Body>
            <>
              <div className="inputs-container">
                <div className="container-input-y-button">
                  <input
                    className="input-con-button"
                    maxLength="15"
                    placeholder="Medias"
                    value={name}
                    onChange={handleChange}
                  />
                  <Button className="btn btn-warning" onClick={handleSorpresa}>
                    Sorprendeme!
                  </Button>
                </div>
                <input
                  className="input"
                  type="number"
                  placeholder="100"
                  value={precio}
                  min="1"
                  onChange={handlePrecio}
                />
                <input
                  className="input"
                  maxLength="15"
                  placeholder="Lucas"
                  value={destinatario}
                  onChange={handleDestinatario}
                />
                <input
                  className="input"
                  placeholder="http://image..."
                  value={imagen}
                  onChange={handleImagen}
                />
                <input
                  className="input"
                  type="number"
                  placeholder="2"
                  min="1"
                  max="99"
                  value={cantidad}
                  onChange={handleCantidad}
                />
              </div>
              {/* Mensaje de error si un regalo ya existe */}
              <div className="error">
                <p>{error}</p>
              </div>
            </>
          </Modal.Body>

          <Modal.Footer id="modal-footer">
            <Button
              disabled={!enable} //Si no hay nada escrito en el input el boton queda desabilitado
              className="btn btn-success button"
              onClick={handleAdd}
            >
              Agregar
            </Button>
            <Button className="btn btn-danger" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="lista">
        {/* 
        Mientras está cargando o hubo un error con la API podria mostrar esto
        {loading && <p>Loading...</p>}
        {errorAPI && <p>Error...</p>} 
        */}
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
                        {item.itemPrecio}
                      </span>
                    </div>

                    <span className="item-destinatario">
                      {item.itemDestinatario}
                    </span>
                  </div>
                </li>

                <div className="icon">
                  <FontAwesomeIcon
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEdit(item);
                      }
                    }}
                    tabIndex="3"
                    className="icon-edit"
                    icon={faEdit}
                    color="green"
                    fontSize="14px"
                    onClick={() => handleEdit(item)}
                  />

                  <FontAwesomeIcon
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleDelete(item.id);
                      }
                    }}
                    className="pe-auto"
                    tabIndex="4"
                    icon={faXmark}
                    color="red"
                    onClick={() => handleDelete(item.id)}
                  ></FontAwesomeIcon>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button
          tabIndex="2"
          className="btn btn-danger btn-block delete-button"
          onClick={deleteAll}
        >
          Borrar todo
        </button>
      </div>
    </div>
  );
};

export default Home;
