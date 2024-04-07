import React, { useState } from "react";

function BookForm({ onSubmit }) {
  const [book, setBook] = useState({
    title: "",
    firstName: "",
    lastName: "",
    genre: "",
    isbn: "",
    publicationDate: "",
    available: true, // Par défaut à true, ajustez selon votre logique
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajustez ici selon la structure attendue par votre API
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

// function BookForm({ bookData = {}, onSubmit }) {
//   const [book, setBook] = useState(bookData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBook((prevBook) => ({ ...prevBook, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(book);
//     setBook({}); // Réinitialiser le formulaire après soumission
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="title">Titre</label>
//       <input
//         name="title"
//         id="title"
//         value={book.title || ""}
//         onChange={handleChange}
//         required
//       />

//       {/* Supposons que vous avez un champ pour l'ID de l'auteur ou le nom; ajustez selon votre modèle. */}
//       <label htmlFor="author">Auteur</label>
//       <input
//         name="author"
//         id="author"
//         value={book.author || ""}
//         onChange={handleChange}
//         required
//       />

//       <label htmlFor="genre">Genre</label>
//       <input
//         name="genre"
//         id="genre"
//         value={book.genre || ""}
//         onChange={handleChange}
//       />

//       <label htmlFor="isbn">ISBN</label>
//       <input
//         name="isbn"
//         id="isbn"
//         value={book.isbn || ""}
//         onChange={handleChange}
//       />

//       {/* Ajoutez d'autres champs nécessaires ici */}

//       <button type="submit">Soumettre</button>
//     </form>
//   );
// }

export default BookForm;
