import React, { useState } from "react";

function LoanForm({ onSubmit }) {
  const [loanData, setLoanData] = useState({
    book: "",
    userIdentifier: "",
    loanDate: "",
    dueDate: "",
    returnDate: "",
    status: "loaned",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loanData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="book">ID du Livre:</label>
        <input
          id="book"
          name="book"
          value={loanData.book}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="userIdentifier">Identifiant de l'Utilisateur:</label>
        <input
          id="userIdentifier"
          name="userIdentifier"
          value={loanData.userIdentifier}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="loanDate">Date d'Emprunt:</label>
        <input
          type="date"
          id="loanDate"
          name="loanDate"
          value={loanData.loanDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Date de Retour Prévue:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={loanData.dueDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="returnDate">Date de Retour Réelle:</label>
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          value={loanData.returnDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="status">Statut:</label>
        <select
          id="status"
          name="status"
          value={loanData.status}
          onChange={handleChange}
        >
          <option value="loaned">Emprunté</option>
          <option value="returned">Retourné</option>
        </select>
      </div>
      <button type="submit">Soumettre</button>
    </form>
  );
}

export default LoanForm;
