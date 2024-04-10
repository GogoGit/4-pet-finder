const handleErrors = (res) => {
  if (!res.ok) {
    return res.json().then((error) => {
      throw error;
    });
  }
  return res;
};

export const listPets = () => {
  //Note default method = "GET"
  return fetch("http://localhost:3001/pets").then((res) => res.json());
};

export const createPet = (pet) => {
  return fetch("http://localhost:3001/pets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
    .then(handleErrors)
    .then((res) => res.json());
};

export const updatePet = (pet) => {
  return fetch(`http://localhost:3001/pets/${pet.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),
  })
    .then(handleErrors)
    .then((res) => res.json());
};

//   export {1, 2, 3}   //Short cut LOL
