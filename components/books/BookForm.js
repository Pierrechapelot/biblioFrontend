import React, { useState } from "react";

function BookForm({ onSubmit }) {
  const [book, setBook] = useState({
    title: "",
    firstName: "",
    lastName: "",
    genre: "",
    isbn: "",
    publicationDate: "",
    available: true, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...book,
      author: { firstName: book.firstName, lastName: book.lastName },
    });
    setBook({
      title: "",
      firstName: "",
      lastName: "",
      genre: "",
      isbn: "",
      publicationDate: "",
      available: true,
    }); // Réinitialiser le formulaire après soumission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champs du formulaire */}

      <label htmlFor="title">Titre</label>
      <input
        name="title"
        id="title"
        value={book.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="firstName">Prénom de l'Auteur</label>
      <input
        name="firstName"
        value={book.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Nom de l'Auteur</label>
      <input
        name="lastName"
        value={book.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="genre">Genre</label>
      <input
        name="genre"
        id="genre"
        value={book.genre}
        onChange={handleChange}
      />

      <label htmlFor="isbn">ISBN</label>
      <input name="isbn" id="isbn" value={book.isbn} onChange={handleChange} />


      <label htmlFor="publicationDate">Date de Publication</label>
      <input
        type="date" // Type spécifique pour faciliter la saisie de la date
        name="publicationDate"
        id="publicationDate"
        value={book.publicationDate}
        onChange={handleChange}
      />

      <button type="submit">Soumettre</button>
    </form>
  );
}

export default BookForm;
