import { useState } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, itemName: "Media", itemCantidad: 1 },
    { id: 2, itemName: "Caramelos", itemCantidad: 1 },
    { id: 3, itemName: "Vitel Tone", itemCantidad: 1 },
  ]);

  const [name, setName] = useState("");
  const [cantidad, setCantidad] = useState("");
  const enable = name.length > 0;
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setName(event.target.value.trim()); //Trim evita que se pueda agregar un regalo en blanco
  };

  const handleCantidad = (event) => {
    setCantidad(event.target.value);
  };

  const handleAdd = () => {
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
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
    setCantidad(1);
    setError(null);
  };

  const handleDelete = (id) => {
    const newList = items.filter((l) => l.id !== id);
    setItems(newList);
  };

  const deleteAll = () => {
    setItems([]);
    setName("");
    setCantidad(1);
    setError(null);
  };

  return (
    <div className="style center">
      <div className="titulo">
        <h1>Regalos:</h1>
      </div>
      <div className="inputs-container">
        <input
          className="input-regalo"
          value={name}
          onChange={handleChange}
          maxlength="15"
          placeholder="Agregá un item..."
        />
        <input
          className="input-cantidad"
          type="number"
          min="1"
          max="99"
          value={cantidad}
          onChange={handleCantidad}
        />
        <button
          disabled={!enable} //Si no hay nada escrito en el input el boton queda desabilitado
          class="btn btn-success btn-sm button add-button"
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>
      <div className="lista">
        {/* Si la lista de items es igual a cero entonces aparece el siguente mensaje */}
        {items.length === 0 ? (
          <p>¡No hay regalos, Grinch!</p>
        ) : (
          <ul>
            {items.map((item) => (
              <div class="container-lista">
                <li key={item.id}>
                  {item.itemName} {item.itemCantidad}
                </li>
                <div className="icon">
                  <FontAwesomeIcon
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
      {/* Mensaje de error si un regalo ya existe */}
      <div className="error">
        <p>{error}</p>
      </div>

      <div>
        <button
          class="btn btn-danger btn-block delete-button"
          onClick={deleteAll}
        >
          Borrar todo
        </button>
      </div>
    </div>
  );
};

export default Home;
