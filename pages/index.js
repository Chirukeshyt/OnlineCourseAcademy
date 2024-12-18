import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Layout from '@/components/Layout';
import Scholarships from './scholarships';

export default function Home({ scholarships }) {
  return (
    <div className='bg-gray-200' >
        <Navbar />
<Layout>
  {/* <div className='mt-2 ml-2  items-center justify-center'>
  <Link href='/'><button type="button" class="text-blue-600 hover:text-black border-2 border-black font-lg rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Home</button></Link>
  <Link href='/scholarships'><button type="button" class="text-blue-600 hover:text-black border-2 border-black font-lg rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Scholarships</button></Link>
  </div>
  <hr className=' bg-black'/>  */}
<main className="flex-grow  p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the PaperLess Scholarship System</h1>
      <p className="text-gray-700">
        Apply for PaperLess scholarships with ease, track your applications, and receive funds—all online!
      </p>

      <Link href='/scholarships'><button type="button" class="text-white  mt-5 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-lg font-bold rounded-lg text-lg  px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
<p className='px-10'>Apply for PaperLess Scholarship
</p>
</button></Link>
    </main>  
</Layout>
    </div>
  
  );
}
