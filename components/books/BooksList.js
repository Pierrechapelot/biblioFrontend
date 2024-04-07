import React, { useEffect, useState } from "react";

function BooksList({ searchType, searchQuery }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      // Construire l'URL pour pointer vers l'endpoint `/search` avec le paramètre de requête `query`
      let url = `http://localhost:3000/books/search`;
      if (searchQuery) {
        url += `?${searchType}=${encodeURIComponent(searchQuery)}`;
      } else {
        // Si aucun terme de recherche n'est spécifié, utiliser l'endpoint général pour obtenir tous les livres
        url = `http://localhost:3000/books`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        // Ici, vous pourriez définir un état pour gérer l'affichage d'erreurs dans l'UI
      }
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


