// pages/authors/[id]/index.js
import booksData from '../../../data/books.json';
import Header from '../../../components/Header';
import ProtectedRoute from '../../../components/ProtectedRoute';

export async function getStaticPaths() {
  // Generate paths for each author based on their ID
  const paths = booksData.authors.map((author) => ({
    params: { id: author.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // Find the author with the matching ID
  const author = booksData.authors.find((a) => a.id === params.id);

  // Return 404 if the author is not found
  if (!author) return { notFound: true };

  return { props: { author } };
}

export default function AuthorDetails({ author }) {
  return (
    <div>
       <ProtectedRoute>
      <Header />
      <div className="container">
        <h2>{author.name}</h2>
        <p>{author.biography}</p>
      </div>
       </ProtectedRoute>
    </div>
  );
}
