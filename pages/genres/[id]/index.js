// pages/genres/[id]/index.js
import booksData from '../../../data/books.json';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../components/ProtectedRoute';

export async function getStaticPaths() {
  // Generate paths for each genre based on genre ID
  const paths = booksData.genres.map((genre) => ({
    params: { id: genre.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // Find the genre by ID and filter books in that genre
  const genre = booksData.genres.find((g) => g.id === params.id);
  const booksInGenre = booksData.books.filter((book) => book.genreId === params.id);

  // Return 404 if the genre is not found
  if (!genre) return { notFound: true };

  return { props: { genre, booksInGenre } };
}

export default function GenreDetails({ genre, booksInGenre }) {
  return (
    <div>
      <ProtectedRoute>
      <Header />
      <div className="container">
        <h2>{genre.name} Books</h2>
        <ul>
          {booksInGenre.map((book) => (
            <li key={book.id}>{book.title} - ${book.price}</li>
          ))}
        </ul>
      </div>
      </ProtectedRoute>
    </div>
  );
}
