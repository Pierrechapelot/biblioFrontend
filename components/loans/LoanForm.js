function LoanForm({ onFormSubmit }) {
    return (
      <form onSubmit={onFormSubmit}>
        <input name="book" required placeholder="ID du livre" />
        <input name="userIdentifier" required placeholder="Identifiant de l'utilisateur" />
        <input type="date" name="loanDate" required placeholder="Date d'emprunt" />
        <input type="date" name="dueDate" required placeholder="Date de retour prévue" />
        <button type="submit">Soumettre</button>
      </form>
    );
  }
  
  export default LoanForm;