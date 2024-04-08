import React, { useState } from "react";

function AuthorForm({ author, onSave }) {
  const [firstName, setFirstName] = useState(author?.firstName || "");
  const [lastName, setLastName] = useState(author?.lastName || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({ firstName, lastName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prénom:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Nom:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button type="submit">Sauvegarder</button>
    </form>
  );
}

export default AuthorForm;