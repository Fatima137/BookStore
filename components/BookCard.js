import Link from 'next/link';
import styles from './BookCard.module.css';

export default function BookCard({ book }) {
  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className={styles.bookCard}>
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.price}>${book.price.toFixed(2)}</p>
      <div className={styles.rating}>
        <span className={styles.stars}>{renderStars(book.rating)}</span>
        <span>({book.rating})</span>
      </div>
      <Link href={`/books/${book.id}`}>
        <button className={styles.viewButton}>View Details</button>
      </Link>
    </div>
  );
}