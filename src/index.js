import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Destructure State and create State
const App = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((pets) => setPets(pets));
  }, []);

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      <pre>{JSON.stringify(pets, null, 2)}</pre>
      <button>Add a Pet</button>
    </main>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
