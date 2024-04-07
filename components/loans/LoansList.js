function LoansList({ loans }) {
    return (
      <div>
        <h2>Liste des Emprunts</h2>
        <ul>
          {loans.map((loan) => (
            <li key={loan._id}>
              Livre: {loan.book.title}, Emprunteur: {loan.userIdentifier}, Date de retour: {loan.dueDate}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default LoansList;