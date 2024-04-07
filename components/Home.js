import { useState, useEffect } from "react";
import BookForm from "../components/books/BookForm";
import BooksList from "../components/books/BooksList";
import AuthorsList from "../components/authors/AuthorsList";
import AuthorForm from "../components/authors/AuthorForm";
import LoansList from "../components/loans/LoansList"; 
import LoanForm from "../components/loans/LoanForm";
import styles from "../styles/Home.module.css";

function Home() {

  //Etats pour les livres 
  const [showForm, setShowForm] = useState(false); // Pour afficher/cacher le formulaire
  const [showBooks, setShowBooks] = useState(false); // Pour afficher/cacher la liste des livres
  const [searchQuery, setSearchQuery] = useState(""); // Pour gérer la recherche
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);


  //Etats pour les auteurs 

  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [authors, setAuthors] = useState([]);
  // const [selectedAuthorId, setSelectedAuthorId] = useState("");

  //Etat pour les emprunts
  const [loans, setLoans] = useState([]);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [searchParams, setSearchParams] = useState({ userIdentifier: "", book: "" });

  //Gestion des livres
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
    let url = `http://localhost:3000/books/search`;
    if (searchQuery && searchType) {
      url += `?${searchType}=${encodeURIComponent(searchQuery)}`;
    } else {
      url = `http://localhost:3000/books`;
    }
    console.log("Fetching books from URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    if (showBooks) {
      fetchBooks(); // Charger les livres quand showBooks est true et quand searchQuery change
    }
  }, [showBooks, searchQuery, searchType]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowBooks(true);
  };

  // Gestion des auteurs

  const handleShowAuthorForm = () => {
    setShowAuthorForm(true);
    setShowAuthors(false);
    setShowBooks(false);
  };

  const handleShowAuthors = () => {
    setShowAuthors(true);
    setShowAuthorForm(false);
    setShowBooks(false);
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3000/authors");
      if (!response.ok) {
        throw new Error("Failed to fetch authors");
      }
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };

  const handleSaveAuthor = async (author) => {
    const response = await fetch('http://localhost:3000/authors', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    });
    const data = await response.json();
    fetchAuthors();
  };
  
  const fetchBooksByAuthor = async (authorId) => {
    try {
      const response = await fetch(`http://localhost:3000/authors/${authorId}/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books for the author");
      }
      const books = await response.json();
      setBooks(books); // Met à jour l'état des livres avec ceux de l'auteur sélectionné
      setShowBooks(true); // S'assure que la liste des livres s'affiche
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showAuthors) {
      fetchAuthors();
    }
  }, [showAuthors]);


  //Gestion des emprunts


  const fetchLoans = async (query = {}) => {
    let queryString = Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join("&");
    try {
      const response = await fetch(`http://localhost:3000/loans?${queryString}`);
      if (!response.ok) {
        throw new Error("Failed to fetch loans");
      }
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    }
  };

  const handleLoanFormSubmit = async (event) => {
    // event.preventDefault(); // Empêcher le rechargement de la page
  
    // Construire l'objet loan à partir des valeurs des champs du formulaire
    const loanData = {
      book: event.target.book.value, // Assurez-vous que les champs ont des attributs `name` correspondants
      userIdentifier: event.target.userIdentifier.value,
      loanDate: event.target.loanDate.value,
      dueDate: event.target.dueDate.value,
      // Vous pourriez avoir besoin d'ajuster les noms des champs en fonction de votre formulaire
    };
  
    // Envoyer les données à l'API
    try {
      const response = await fetch('http://localhost:3000/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loanData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save the loan');
      }
  
      const savedLoan = await response.json();
      console.log('Loan saved successfully:', savedLoan);
      // Ici, vous pourriez vouloir rafraîchir la liste des emprunts pour afficher le nouvel emprunt
      fetchLoans(); // Supposant que fetchLoans est votre fonction pour récupérer tous les emprunts
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

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
      {showBooks && <BooksList searchType={searchType} searchQuery={searchQuery} books={books} />}


      <h2>Gestion des auteurs</h2>
      <button onClick={handleShowAuthorForm}>Ajouter un Auteur</button>
      <button onClick={handleShowAuthors}>Voir tous les Auteurs</button>
      
      {showAuthorForm && <AuthorForm onSave={handleSaveAuthor} />} 
      {showAuthors && <AuthorsList onFetchBooksByAuthor={fetchBooksByAuthor} authors={authors} />} 

      <h2>Gestion des Emprunts</h2>
      <button onClick={() => setShowLoanForm(!showLoanForm)}>
        {showLoanForm ? "Annuler" : "Nouvel Emprunt"}
      </button>
      {showLoanForm && <LoanForm onFormSubmit={handleLoanFormSubmit} />}
      <LoansList loans={loans} />
      {/* Ajouter ici la logique pour la recherche des emprunts */}
    </div>
  );
}

export default Home;
