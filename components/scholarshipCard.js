const ScholarshipCard = ({ name, description, deadline }) => (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500">Deadline: {deadline}</p>
    </div>
  );
  
  export default ScholarshipCard;
  