import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Login from './Login';

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(""); 

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${baseURL}/get`)
        .then((res) => {
          const sortedToDos = res.data.sort((a, b) => {
            if (b.priority !== a.priority) {
              return b.priority - a.priority;
            }
            return new Date(a.date) - new Date(b.date);
          });
  
          setToDos(sortedToDos);
        })
        .catch((err) => console.log(err));
    }
  }, [updateUI, isLoggedIn]);

  const saveToDo = () => {
    axios
    .post(`${baseURL}/save`, { toDo: input, date: deadline, priority }) 
    .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
        setDeadline("");
        setPriority("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="App">
      {isLoggedIn ? (
        <div className="container">
          <h1 className="title">ToDo App</h1>

          <div className="input_holder">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Add a ToDo..."
            />
             <input
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              type="date" // Use the 'date' input type for the deadline
              placeholder="Deadline"
            />
            <input
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    type="number" // Use the 'number' input type for the priority
    placeholder="Priority"
  />
            <button onClick={saveToDo}>Add</button>
          </div>

          <div className="list">
            {toDos.map((el) => (
              <ToDo
                key={el._id}
                text={el.toDo}
                date={el.date}
                priority={el.priority}
                id={el._id}
                setUpdateUI={setUpdateUI}
                setShowPopup={setShowPopup}
                setPopupContent={setPopupContent}
              />
            ))}
          </div>
        </div>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}

      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
