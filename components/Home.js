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
  const [showForm, setShowForm] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [books, setBooks] = useState([]);

  //Etats pour les auteurs

  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [showAuthors, setShowAuthors] = useState(false);
  const [authors, setAuthors] = useState([]);

  //Etat pour les emprunts
  const [loans, setLoans] = useState([]);
  const [showLoanForm, setShowLoanForm] = useState(false);

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
        setShowForm(false);
        setShowBooks(true);
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

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the book");
      }

      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    if (showBooks) {
      fetchBooks();
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
    const response = await fetch("http://localhost:3000/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(author),
    });
    const data = await response.json();
    fetchAuthors();
  };

  const fetchBooksByAuthor = async (authorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/authors/${authorId}/books`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books for the author");
      }
      const books = await response.json();
      setBooks(books);
      setShowBooks(true);
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

  const fetchLoans = async () => {
    const url = "http://localhost:3000/loans";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch loans");
      }
      const data = await response.json();
      setLoans(data);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    }
  };

  const handleSubmitLoan = async (loanData) => {
    console.log("Submitting loan data:", loanData);

    const url = "http://localhost:3000/loans";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit loan, status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Loan submitted successfully:", data);

      setShowLoanForm(false);
      fetchLoans();
    } catch (error) {
      console.error("Error submitting loan:", error);
    }
  };

  const handleReturnLoan = async (loanId) => {
    try {
      const response = await fetch(`http://localhost:3000/loans/${loanId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "returned",
          returnDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to return loan, status: ${response.status}`);
      }

      fetchLoans();
    } catch (error) {
      console.error("Error returning loan:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Biblioth</h1>
      <h2>Gestion des livres</h2>
      <button onClick={handleShowForm}>Ajouter un Livre</button>
      <button onClick={handleShowBooks}>Voir tous les Livres</button>
      <form onSubmit={handleSearch}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
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
      {showBooks && (
        <BooksList
          searchType={searchType}
          searchQuery={searchQuery}
          books={books}
          onDeleteBook={handleDeleteBook}
        />
      )}

      <h2>Gestion des auteurs</h2>
      <button onClick={handleShowAuthorForm}>Ajouter un Auteur</button>
      <button onClick={handleShowAuthors}>Voir tous les Auteurs</button>

      {showAuthorForm && <AuthorForm onSave={handleSaveAuthor} />}
      {showAuthors && (
        <AuthorsList
          onFetchBooksByAuthor={fetchBooksByAuthor}
          authors={authors}
        />
      )}

      <h2>Gestion des Emprunts</h2>
      <button onClick={() => setShowLoanForm(!showLoanForm)}>
        {showLoanForm ? "Annuler" : "Nouvel Emprunt"}
      </button>
      {showLoanForm && <LoanForm onSubmit={handleSubmitLoan} />}
      <LoansList loans={loans} onReturnLoan={handleReturnLoan} />
    </div>
  );
}

export default Home;
