import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [todolist, setTodoslist] = useState([]);
  const [isToggle, setIsToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const day = new Date().toLocaleDateString("en-us", { weekday: "long" });
  const date = new Date().toLocaleDateString("en-us", { day: "numeric" });
  const month = new Date().toLocaleDateString("en-us", { month: "short" });

  const handleEdit = (id) => {
    const editItem = todolist.find((elem) => {
      return elem.id === id;
    });
    console.log(editItem);
    setIsToggle(false);
    setInput(editItem.name);
    setIsEditItem(id);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input) {
      alert("please enter the data!!");
    } else if (input && !isToggle) {
      setTodoslist(
        todolist.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setIsToggle(true);
      setInput("");
      setIsEditItem(null);
    } else {
      const newItem = { id: new Date().getTime().toString(), name: input };
      setTodoslist([newItem, ...todolist]);
      setInput("");
      console.log(newItem);
    }
  };

  const handleDelete = (idx) => {
    const newListItem = todolist.filter((elem) => {
      return idx !== elem.id;
    });
    setTodoslist(newListItem);
  };
  const handleCheckbox = (e, id) => {
    e.preventDefault();
    const element = todolist.findIndex((elem) => elem.id === id);
    const newTask = [...todolist];
    newTask[element] = {
      ...newTask[element],
      isCompleted: true
    };
    setTodoslist(newTask);
  };

  return (
    <>
      <div className="title">TODO LIST</div>
      <div className="App">{`${day}, ${date} ${month}`}</div>

      <div className="container">
        <input
          type="text"
          placeholder="Enter text here"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        {isToggle ? (
          <button className="btn btn-primary" onClick={handleAdd}>
            ADD TODO
          </button>
        ) : (
          <button className="edit" onClick={handleAdd}>
            Edit
          </button>
        )}
        <div className="list">
          {todolist.map((elem) => {
            return (
              <div
                className={elem.isCompleted ? "crossText" : " "}
                key={elem.id}
              >
                <div>
                  <h2 className="items">{elem.name}</h2>
                </div>
                <div>
                  <button className="bt" onClick={() => handleDelete(elem.id)}>
                    delete
                  </button>
                  <button className="edit" onClick={() => handleEdit(elem.id)}>
                    Edit
                  </button>
                  <button
                    className="Completed"
                    onClick={(e) => handleCheckbox(e, elem.id)}
                  >
                    Completed
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
