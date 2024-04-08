import React from "react";

function LoansList({ loans, onReturnLoan }) {
  return (
    <div>
      <h2>Liste des Emprunts</h2>
      {loans.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Livre</th>
              <th>Utilisateur</th>
              <th>Date d'emprunt</th>
              <th>Date de retour prévue</th>
              <th>Date de retour réelle</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.book ? loan.book.title : "Livre inconnu"}</td>
                <td>{loan.userIdentifier}</td>
                <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                <td>
                  {loan.returnDate
                    ? new Date(loan.returnDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {loan.status !== "returned" && (
                    <button onClick={() => onReturnLoan(loan._id)}>
                      Marquer comme retourné
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun emprunt n'a été trouvé.</p>
      )}
    </div>
  );
}

export default LoansList;
