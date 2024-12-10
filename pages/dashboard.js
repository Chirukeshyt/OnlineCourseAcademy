import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      router.push('/auth/login'); // Redirect to login if not authenticated
    } else {
      setUser(session.user);
    }
  }, [router]);

  return (
    <div className="container text-white mx-auto px-4 py-8">
      {user ? (
        <>
          <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
          <p className="mt-4">This is your dashboard.</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
