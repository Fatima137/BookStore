// pages/books/index.js
import Header from '../../components/Header';
import BookCard from '../../components/BookCard';
import booksData from '../../data/books.json';
import ProtectedRoute from '../../components/ProtectedRoute';
export default function Books() {
  return (
    <div>
      <ProtectedRoute>
      <Header />
      <div className="container">
        <h2>All Books</h2>
        <div>
          {booksData.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      </ProtectedRoute>
    </div>
  );
}
