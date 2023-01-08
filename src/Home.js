import { useState } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, itemName: "Media" },
    { id: 2, itemName: "Caramelos" },
    { id: 3, itemName: "Vitel Tone" },
  ]);

  const [name, setName] = useState("");
  const enable = name.length > 0;
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setName(event.target.value.trim()); //Trim evita que se pueda agregar un regalo en blanco
  };

  const handleAdd = () => {
    const existingItem = items.find(
      (item) => item.itemName.toLowerCase() === name.toLowerCase()
    );
    if (existingItem) {
      console.log("alalal");
      setError("¡Este regalo ya esta en la lista!");
      return;
    }

    const newItem = {
      id: items.length + 1,
      itemName: name,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
    setError(null);
  };

  const handleDelete = (id) => {
    const newList = items.filter((l) => l.id !== id);
    setItems(newList);
  };

  const deleteAll = () => {
    setItems([]);
    setName("");
    setError(null);
  };

  return (
    <div className="style center">
      <div className="titulo">
        <h1>Regalos:</h1>
      </div>
      <div>
        <input
          value={name}
          onChange={handleChange}
          placeholder="Agregá un item..."
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
                <li key={item.id}>{item.itemName}</li>
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
          Borar todo
        </button>
      </div>
    </div>
  );
};

export default Home;
