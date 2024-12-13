// components/GenreCard.js
import Link from 'next/link';
import styles from './GenreCard.module.css';

export default function GenreCard({ genre }) {
  // Function to get genre-specific class
  const getGenreClass = (genreName) => {
    const name = genreName.toLowerCase();
    const baseClass = styles.genreCard;
    
    const genreClasses = {
      'fiction': styles.fiction,
      'mystery': styles.mystery,
      'romance': styles.romance,
      'science fiction': styles.scifi,
      'biography': styles.biography
    };

    return `${baseClass} ${genreClasses[name] || ''}`;
  };

  return (
    <Link href={`/genres/${genre.id}`}>
      <div className={getGenreClass(genre.name)}>
        <h3 className={styles.name}>{genre.name}</h3>
        <button className={styles.viewButton}>
          View Books in {genre.name}
        </button>
      </div>
    </Link>
  );
}