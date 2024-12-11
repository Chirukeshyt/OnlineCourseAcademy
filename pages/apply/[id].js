import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function Apply({ scholarship, error }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_number) {
      setMessage('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    try {
      const { error: insertError } = await supabase.from('applications').insert([
        {
          scholarship_id: scholarship.id,
          ...formData,
          application_status: 'pending',
        },
      ]);

      if (insertError) throw insertError;

      setMessage('Application submitted successfully! Redirecting to payment page...');

      if (scholarship.payment_link) {
        setTimeout(() => {
          window.location.href = scholarship.payment_link;
        }, 2000);
      } else {
        setMessage('Application submitted, but no payment link found.');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="mx-auto px-4 py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto px-4 py-8">
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
              {message && <p className="mt-4 text-green-500">{message}</p>}
            </form>
          </>
        ) : (
          <p>Loading scholarship details...</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const { data, error } = await supabase
      .from('scholarships')
      .select('id, title, description, payment_link')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { props: { scholarship: data } };
  } catch (err) {
    console.error('Error fetching scholarship:', err);
    return { props: { error: 'Failed to load scholarship details.' } };
  }
}
