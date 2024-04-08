import React, { useEffect, useState } from "react";

function AuthorsList({ onFetchBooksByAuthor }) {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    fetch("http://localhost:3000/authors")
      .then((response) => response.json())
      .then(setAuthors)
      .catch(console.error);
  };

  const deleteAuthor = (authorId) => {
    fetch(`http://localhost:3000/authors/${authorId}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete the author');
      }

      fetchAuthors(); 
    })
    .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Auteurs</h2>
      <ul>
        {authors.map((author) => (
          <li key={author._id}>
            {author.firstName} {author.lastName}
            <button onClick={() => onFetchBooksByAuthor(author._id)}>
              Voir les livres
            </button>
            <button onClick={() => deleteAuthor(author._id)}>
              Supprimer
            </button>
           
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorsList;



// import React, { useEffect, useState } from "react";

// function AuthorsList() {
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/authors")
//       .then((response) => response.json())
//       .then(setAuthors)
//       .catch(console.error);
//   }, []);

//   return (
//     <div>
//       <h2>Auteurs</h2>
//       <ul>
//         {authors.map((author) => (
//           <li key={author._id}>
//             {author.firstName} {author.lastName}
//             <button onClick={() => fetchBooksByAuthor(author._id)}>
//               Voir les livres
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AuthorsList;
