import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login'); // Redirect to login page if not logged in
    }
  }, [user]);

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return children; // Render the protected content
};

export default ProtectedRoute;
