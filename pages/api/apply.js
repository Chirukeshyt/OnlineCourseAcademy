import { useAuth } from '../context/AuthContext';

export default function Apply() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h1>Apply for Scholarship, {user.email}</h1>
      ) : (
        <p>Please log in to apply for scholarships.</p>
      )}
    </div>
  );
}
