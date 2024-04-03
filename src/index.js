import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Pet } from "./Pet";
import "./index.css";

// Destructure State and create State
const App = () => {
  const [pets, setPets] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3001/pets")
  //     .then((res) => res.json())
  //     .then((pets) => setPets(pets));
  // }, []);

  // Using Async Await
  // Note the use of the keyword:  async
  // res is SHORT for response
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3001/pets");
      const pets = await res.json();
      setPets(pets);
    }
    getData();
  }, []);

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {/* <pre>{JSON.stringify(pets, null, 2)}</pre> */}
      {pets.map((pet) => (
        <li key={pet.id}>
          <Pet pet={pet} />
        </li>
      ))}
      <button>Add a Pet</button>
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
