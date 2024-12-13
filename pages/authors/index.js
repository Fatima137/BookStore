// pages/authors/index.js
import Header from '../../components/Header';
import AuthorCard from '../../components/AuthorCard';
import booksData from '../../data/books.json';
import styles from '../../components/AuthorCard.module.css';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Authors() {
  return (
    <div>
      <Header />
       <ProtectedRoute>
      <div className="container">
        <h2>Authors</h2>
        <div>
          {booksData.authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </div>
       </ProtectedRoute>
    </div>
  );
}
