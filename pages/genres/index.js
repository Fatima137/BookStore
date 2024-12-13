// pages/genres/index.js
import Header from '../../components/Header';
import GenreCard from '../../components/GenreCard';
import booksData from '../../data/books.json';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Genres() {
  return (
    <div>
      <ProtectedRoute>
      <Header />
      <div className="container">
        <h2>Genres</h2>
        <div>
          {booksData.genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </div>
      </div>
      </ProtectedRoute>
    </div>
  );
}
