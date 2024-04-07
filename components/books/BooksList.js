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
        console.log(response)
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
  }, [searchQuery, searchType]);


  return (
    <div>
{books.length > 0 ? (
    <ul>
      {books.map((book) => {

        return (
          <li key={book._id}>
            {book.title} - {book.author?.firstName} {book.author?.lastName}
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Aucun livre trouvé.</p>
      )}
    </div>
  );
}

export default BooksList;




