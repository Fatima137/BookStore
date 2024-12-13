import Link from 'next/link';
import styles from './AuthorCard.module.css';

export default function AuthorCard({ author }) {
  return (
    <div className={styles.authorCard}>
      <h3 className={styles.name}>{author.name}</h3>
      <p className={styles.biography}>{author.biography}</p>
      <Link href={`/authors/${author.id}`}>
        <button className={styles.viewButton}>View More</button>
      </Link>
    </div>
  );
}