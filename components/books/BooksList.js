import React, { useEffect, useState } from "react";

function BooksList({ searchQuery }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Ici, ajoutez la logique pour appeler votre API et récupérer les livres.
    // La requête pourrait inclure la recherche par titre, auteur, ou genre si searchQuery n'est pas vide.
    const fetchBooks = async () => {
      let url = `http://localhost:3000/books`;
      if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setBooks(data);
    };

    fetchBooks();
  }, [searchQuery]);

  return (
    <div>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book._id}>{book.title} - {book.author?.firstName} {book.author?.lastName}</li>
          ))}
        </ul>
      ) : (
        <p>Aucun livre trouvé.</p>
      )}
    </div>
  );
}

export default BooksList;

// function BookList() {
//   const [books, setBooks] = useState([]); // Stocke les livres récupérés de l'API

//   useEffect(() => {
//     // Fonction pour charger les livres depuis l'API
//     const fetchBooks = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/books"); 
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setBooks(data); // Mise à jour de l'état avec les livres récupérés
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };

//     fetchBooks(); // Appel de la fonction au chargement du composant
//   }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois après le premier rendu

//   return (
//     <div>
//       <h2>Books List</h2>
//       <ul>
//       {books.map(book => (
//   <li key={book._id}>
//     {book.title} by {book.author ? `${book.author.firstName} ${book.author.lastName}` : 'Unknown Author'}
//   </li>
// ))}
//       </ul>
//     </div>
//   );
// }


