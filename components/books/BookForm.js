import React, { useState, useEffect } from "react";

function BookForm({ onSubmit, onSave, editingBook }) {
  const [book, setBook] = useState({
    title: "",
    firstName: "",
    lastName: "",
    genre: "",
    isbn: "",
    publicationDate: "",
    available: true,
  });

  useEffect(() => {
    if (editingBook) {
      setBook({
        title: editingBook.title,
        firstName: editingBook.author.firstName,
        lastName: editingBook.author.lastName,
        genre: editingBook.genre,
        isbn: editingBook.isbn,
        publicationDate: editingBook.publicationDate.substring(0, 10),
        available: editingBook.available,
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Détermine si je suiss en mode d'édition
    if (editingBook) {
      // En mode d'édition, j'utilise onSave
      onSave(book);
    } else {
      // En mode de création, j'utilise onSubmit
      onSubmit({
        ...book,
        author: { firstName: book.firstName, lastName: book.lastName },
      });

      // Réinitialise  le formulaire après la soumission
      setBook({
        title: "",
        firstName: "",
        lastName: "",
        genre: "",
        isbn: "",
        publicationDate: "",
        available: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        type="date"
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
