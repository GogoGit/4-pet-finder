import { useState, useRef } from "react";
import Modal from "react-modal";

// const NewPetModal = ({ isOpen, onCancel, onSave }) => {
const NewPetModal = ({ onCancel, onSave }) => {
  const [name, setName] = useState("");
  const [kind, setKind] = useState("");
  const [photo, setPhoto] = useState(null);

  const [errors, setErrors] = useState(null);
  const [saving, setSaving] = useState(false);
  const photoInput = useRef();

  const submit = (event) => {
    event.preventDefault();
    setSaving(true);
    onSave({
      name,
      kind,
      photo,
    }).catch((error) => {
      console.log(error);
      setErrors(error);
      setSaving(false);
    });
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
    <Modal isOpen={true} onRequestClose={onCancel}>
      <h2>New Pet</h2>
      <form className="pet-form" onSubmit={submit}>
        {photo && <img alt="the pet" src={photo} />}

        <label htmlFor="photo">Photo</label>
        <input type="file" id="photo" ref={photoInput} onChange={updatePhoto} />

        <label htmlFor="name">Name</label>
        <input
          //   require  //this wouild be front end validation
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* This is back end error checking since this comes from the server */}
        {errors && errors.name && <div className="error">{errors.name}</div>}

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

        {/* This is back end error checking since this comes from the server */}
        {errors && errors.kind && <div className="error">{errors.kind}</div>}

        <button disabled={saving} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={saving}>
          Save
        </button>
      </form>
    </Modal>
  );
};

export default NewPetModal;
