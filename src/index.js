import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import NewPetModal from "./NewPetModal";
import EditPetModal from "./EditPetModal";
import { Pet } from "./Pet";
import { listPets, createPet } from "./api";

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

    // Restructructoring 1

    // async function getData() {
    //   setLoading(true);

    //   try {
    //     const res = await fetch("http://localhost:3001/pets");
    //     const pets = await res.json();
    //     setPets(pets);
    //     setLoading(false);
    //   } catch (err) {
    //     console.warn(err);
    //     setLoading(false);
    //   }
    // }
    // getData();
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

  // Restructructoring 2

  // const addPet = async ({ name, kind, photo }) => {
  //   // spread Operator
  //   setPets([
  //     ...pets,
  //     {
  //       id: Math.random(),
  //       name,
  //       kind,
  //       photo,
  //     },
  //   ]);
  //   setNewPetOpen(false);
  // };

  const addPet = async (pet) => {
    return createPet(pet).then((newPet) => {
      setPets([...pets, newPet]);
      setNewPetOpen(false);
    });
  };

  const savePet = async (pet) => {
    console.log("editing a pet", pet);
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
                {/* Restructructoring 3 */}
                {/* <Pet pet={pet} /> */}
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

      {/* replace with NewPetModal */}
      {/* <Modal isOpen={isNewPetOpen} onRequestClose={() => setNewPetOpen(false)}>
        hello
      </Modal> */}

      {/* We need this condition to prevent the form from Rendering all the time and saving the data you enter.
        Remove this and add a pet and cancel, then add again and you'll see that the form is not cleared.  It
        has the old data!!!!*/}
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
