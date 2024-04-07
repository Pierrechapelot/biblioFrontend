import { useState, useEffect } from "react";
import BookForm from "../components/books/BookForm";
import BooksList from "../components/books/BooksList";
import styles from "../styles/Home.module.css";

function Home() {
  const [showForm, setShowForm] = useState(false); // Pour afficher/cacher le formulaire
  const [showBooks, setShowBooks] = useState(false); // Pour afficher/cacher la liste des livres
  const [searchQuery, setSearchQuery] = useState(""); // Pour gérer la recherche
  const [searchType, setSearchType] = useState("title");

  const handleShowForm = () => {
    setShowForm(true);
    setShowBooks(false); // Cache la liste des livres si elle est affichée
  };

  const handleShowBooks = () => {
    setShowBooks(true);
    setShowForm(false); // Cache le formulaire si il est affiché
  };

  const handleSubmitBook = async (book) => {
    console.log("Submitting book:", book);
    fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setShowForm(false); // Cache le formulaire après soumission
        setShowBooks(true); // Optionnel: Montre la liste des livres mise à jour
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchBooks = async () => {
    const response = await fetch(
      `http://localhost:3000/books/search?query=${searchQuery}`
    );
    const data = await response.json();
    setBooks(data); // Mise à jour de l'état avec les livres récupérés
  };

  useEffect(() => {
    if (showBooks) {
      fetchBooks(); // Charger les livres quand showBooks est true et quand searchQuery change
    }
  }, [showBooks, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(); // Effectuer la recherche directement ici
  };

  return (
    <div className={styles.container}>
      <h1>Gestion de Bibliothèque</h1>
      <h2>Gestion des livres</h2>
      <button onClick={handleShowForm}>Ajouter un Livre</button>
      <button onClick={handleShowBooks}>Voir tous les Livres</button>
      <form onSubmit={handleSearch}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)} // Permet à l'utilisateur de choisir entre 'title' et 'genre'
        >
          <option value="title">Titre</option>
          <option value="genre">Genre</option>
        </select>
        <input
          type="text"
          placeholder="Rechercher un livre par titre ou genre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Recherche</button>
      </form>

      {showForm && <BookForm onSubmit={handleSubmitBook} />}
      {showBooks && <BooksList searchQuery={searchQuery} />}
    </div>
  );
}

export default Home;
