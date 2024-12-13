// pages/books/[id]/index.js
import booksData from '../../../data/books.json';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../components/ProtectedRoute';

export async function getStaticPaths() {
  // Generate paths based on book IDs in the JSON data
  const paths = booksData.books.map((book) => ({
    params: { id: book.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // Find the book that matches the ID in the URL
  const book = booksData.books.find((b) => b.id === params.id);

  // Return 404 if the book is not found
  if (!book) return { notFound: true };

  return { props: { book } };
}

export default function BookDetails({ book }) {
  return (
    <div>
      <ProtectedRoute>
      <Header />
      <div className="container">
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.authorId}</p>
        <p><strong>Description:</strong> {book.description}</p>
        <p><strong>Genre:</strong> {book.genreId}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <p><strong>Rating:</strong> {book.rating} stars</p>
      </div>
      </ProtectedRoute>
    </div>
  );
}
