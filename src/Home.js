import { useState, useEffect } from "react";
import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [items, setItems] = useState(() => {
    //Lista de regalos

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
  const [cantidad, setCantidad] = useState("1"); // Cantidad de regalos
  const enable = name.length > 0; // Si no se escribio nada en el input de name el boton de Agregar quedasabilitado
  const [error, setError] = useState(null);
  const [imagen, setImagen] = useState("");

  const handleImagen = (event) => {
    setImagen(event.target.value);
  };

  const handleChange = (event) => {
    setName(event.target.value.trim()); // Trim evita que se pueda agregar un regalo en blanco
  };

  const handleCantidad = (event) => {
    setCantidad(event.target.value);
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
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
    setCantidad(1);
    setError(null);
    setImagen("");
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
    setImagen("");
  };

  return (
    <div className="style center">
      <div className="titulo">
        <h1>Regalos:</h1>
      </div>
      <div className="inputs-container">
        <input
          className="input"
          maxLength="15"
          placeholder="Medias"
          value={name}
          onChange={handleChange}
        />
        <input
          className="input"
          // multiple
          // accept="image/*"
          placeholder="http://image..."
          value={imagen}
          onChange={handleImagen}
        />
        <input
          className="input"
          id="input-cantidad"
          type="number"
          min="1"
          max="99"
          value={cantidad}
          onChange={handleCantidad}
        />

        <button
          disabled={!enable} //Si no hay nada escrito en el input el boton queda desabilitado
          className="btn btn-success btn-sm button add-button"
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
              <div className="container-lista">
                <li key={item.id}>
                  {/* <span>{item.itemImagen}</span> */}
                  <img
                    className="item-imagen"
                    src={item.itemImagen}
                    alt="imagen"
                  />
                  <span>{item.itemName}</span>
                  <span>{item.itemCantidad}</span>
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
