// // components/Header.js
// import Link from 'next/link';
// import styles from '../styles/Header.module.css';

// export default function Header() {
//   return (
//     <header className={styles.header}>
//       <h1 className={styles.title}>Book Store</h1>
//       <nav className={styles.nav}>
//         <Link href="/" className={styles.link}>Featured Books</Link>
//         <Link href="/books" className={styles.link}>All Books</Link>
//         <Link href="/genres" className={styles.link}>Genres</Link>
//         <Link href="/authors" className={styles.link}>Authors</Link>
//       </nav>
//     </header>
//   );
// }

// components/Header.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Header() {
  const [theme, setTheme] = useState('light');
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Clear user session
    router.push('/login'); // Redirect to login page
  };


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Book Store</h1>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>Featured Books</Link>
        <Link href="/books" className={styles.link}>All Books</Link>
        <Link href="/genres" className={styles.link}>Genres</Link>
        <Link href="/authors" className={styles.link}>Authors</Link>
        <Link href="/search" className={styles.link}>Search</Link>
      </nav>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {/* Logout Button (only visible if logged in) */}
      {user && <button onClick={handleLogout}>Logout</button>}


    </header>
  );
}
