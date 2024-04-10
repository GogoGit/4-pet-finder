import { useState, useRef } from "react";
import Modal from "react-modal";

const NewPetModal = ({ isOpen, onCancel, onSave }) => {
  const [name, setName] = useState("");
  const [kind, setKind] = useState("");
  const [photo, setPhoto] = useState(null);
  const photoInput = useRef();

  const submit = (event) => {
    event.preventDefault();
    // this is the short cut for
    /* onSave({
        name:name,
        kind:kind,
        photo:photo,
    });  */
    onSave({ name, kind, photo });
  };

  const updatePhoto = () => {
    const file = photoInput.current.files && photoInput.current.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    // index.js, we commented out this line 'isOpen={isNewPetOpen}' so we need to set this 'isOpen' to "true" vs "isOpen"
    // <Modal isOpen={isOpen} onRequestClose={onCancel}>
    <Modal isOpen={true} onRequestClose={onCancel}>
      <h2>New Pet</h2>
      <form className="pet-form" onSubmit={submit}>
        {photo && <img alt="the pet" src={photo} />}

        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" ref={photoInput} onChange={updatePhoto} />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="kind">Kind</label>
        <select
          name="kind"
          id="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value)}
        >
          <option value="">Choose a kind</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default NewPetModal;