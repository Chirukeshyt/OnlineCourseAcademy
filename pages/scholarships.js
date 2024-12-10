import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Layout from "@/components/Layout";

export async function getServerSideProps() {
  const { data: scholarships, error } = await supabase.from('scholarships').select('*');
  
  if (error) {
    console.error(error);
  }

  return { props: { scholarships } };
}

export default function Scholarships({ scholarships }) {
  return (
 <Layout>
    
    <div className="  mx-auto px-4 py-8">
      <h1 className="text-4xl  font-bold text-center">Available Scholarships</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {scholarships.map((scholarship) => (
          <div key={scholarship.id} className="p-6 border  rounded-md shadow-lg">
            <h2 className="text-xl   font-semibold">Course:- {scholarship.title}</h2>
            <p className="mt-2 font-semibold ">Description:- <p className="font-thin">{scholarship.description}</p></p>
            <p className="mt-2 flex  "><p className="font-semibold">Amount:- &nbsp; </p> ₹{scholarship.amount}</p>
            <p className="mt-2 flex "><p className="font-semibold">Eligibility:- &nbsp; </p> {scholarship.eligibility}</p>
            <Link href={`/apply/${scholarship.id}`}>
            <button type="button" class="text-white  mt-5 bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-lg font-bold rounded-lg text-lg  px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">
<p className='px-10'>Apply Now
</p>
</button>
              
            </Link>
          </div>
        ))}
      </div>
    </div>

 </Layout>
  
  );
}
