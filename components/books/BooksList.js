import React, { useEffect, useState } from "react";

function BooksList({ searchType, searchQuery, onDeleteBook, onEditBook }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      let url = `http://localhost:3000/books/search`;
      if (searchQuery) {
        url += `?${searchType}=${encodeURIComponent(searchQuery)}`;
      } else {
        // Si aucun terme de recherche n'est spécifié, utiliser l'endpoint général pour obtenir tous les livres
        url = `http://localhost:3000/books`;
      }
      try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
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
                <button onClick={() => onDeleteBook(book._id)}>
                  Supprimer
                </button>
                <button onClick={() => onEditBook(book)}>Modifier</button>
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
