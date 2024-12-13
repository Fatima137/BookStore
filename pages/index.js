import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import booksData from '../data/books.json';

export default function Home() {
  const { user } = useAuth(); // Access the user's authentication status
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not logged in
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // Show nothing (or a loading spinner) while redirecting
    return null;
  }

  const featuredBooks = booksData.books.slice(0, 3);

  return (
    <div>
      {/* Show header and content only after user is authenticated */}
      <Header />
      <div className="container">
        <h2>Featured Books</h2>
        <div>
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
