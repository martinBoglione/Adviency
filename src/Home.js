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

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleAdd = () => {
    const newItem = {
      id: items.length + 1,
      itemName: name,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
  };

  const handleDelete = (id) => {
    const newList = items.filter((l) => l.id !== id);

    setItems(newList);
  };

  const deleteAll = () => {
    setItems([]);
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
          class="btn btn-success btn-sm button add-button"
          onClick={handleAdd}
        >
          {" "}
          Agregar{" "}
        </button>
      </div>
      <div className="lista">
        {items.map((item) => (
          <div class="container-lista">
            <ul>
              <li>{item.itemName}</li>
            </ul>
            <div className="icon">
              <FontAwesomeIcon
                icon={faXmark}
                color="red"
                onClick={() => handleDelete(item.id)}
              ></FontAwesomeIcon>
            </div>
          </div>
        ))}
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
