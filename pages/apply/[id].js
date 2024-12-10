import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function Apply() {
  const [scholarship, setScholarship] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchScholarship = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setScholarship(data);
      }
    };

    fetchScholarship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleApply = async () => {
    setLoading(true);

    // Insert the application into the 'applications' table
    const { error } = await supabase.from('applications').insert([
      {
        scholarship_id: scholarship.id,
        ...formData,
        application_status: 'pending',
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage('Something went wrong. Please try again later.');
    } else {
      setMessage('Application submitted successfully! With 3-5 you will Get An Confirmation Mail...');
    }
  };

  return (
   <Layout>
     <div className=" mx-auto px-4 py-8">

      {scholarship ? (
        <>
          <h1 className="text-3xl font-bold">{scholarship.title}</h1>
          <p className="mt-4">{scholarship.description}</p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-2 p-2 w-full border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleApply}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </form>
        </>
      ) : (
        <p>Loading scholarship details...</p>
      )}
    </div>
   </Layout>
  );
}
