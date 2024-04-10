import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import NewPetModal from "./NewPetModal";
import EditPetModal from "./EditPetModal";
import { Pet } from "./Pet";
import { listPets, createPet, updatePet } from "./api";

import "./index.css";

const App = () => {
  // Destructure State and create State
  const [pets, setPets] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isNewPetOpen, setNewPetOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);

  useEffect(() => {
    setLoading(true);
    listPets()
      .then((pets) => setPets(pets))
      .finally(() => setLoading(false));
  }, []);

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

  const addPet = async (pet) => {
    return createPet(pet).then((newPet) => {
      setPets([...pets, newPet]);
      setNewPetOpen(false);
    });
  };

  const savePet = async (pet) => {
    console.log("editing a pet", pet);

    return updatePet(pet).then((updatedPet) => {
      // Here we need to find the pet we need to udpate (Looping through all records is not optimal)
      setPets((pets) =>
        pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );
    });
    setCurrentPet(null);
  };

  return (
    <main>
      <h1>Adopt-a-Pet</h1>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <ul>
            {pets.map((pet) => (
              <li key={pet.id}>
                <Pet
                  pet={pet}
                  onEdit={() => {
                    console.log("pet", pet);
                    setCurrentPet(pet);
                  }}
                />
              </li>
            ))}
          </ul>
          <button onClick={() => setNewPetOpen(true)}>Add a Pet</button>
        </>
      )}

      {isNewPetOpen && (
        <NewPetModal
          // isOpen={isNewPetOpen}
          onSave={addPet}
          onCancel={() => setNewPetOpen(false)}
        />
      )}

      {currentPet && (
        <EditPetModal
          pet={currentPet}
          onCancel={() => setCurrentPet(null)}
          onSave={savePet}
        />
      )}
    </main>
  );
};

const container = document.getElementById("root");
Modal.setAppElement(container);
const root = createRoot(container);
root.render(<App />);
