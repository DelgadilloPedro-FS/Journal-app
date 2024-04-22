import { getJournals, set } from "../journals";
import React, { useState, useEffect } from "react";

export default function Index() {
  const [journals, setJournals] = useState([]);
  useEffect(() => {
    const fetchJournals = async () => {
      // Replace with your actual data fetching logic (e.g., API call)
      const response = await getJournals();
      // const data = await response.json();
      setJournals(response);
    };

    fetchJournals();
  }, []);

  return (
    <div className="items-center justify-center bg-gray-100 p-6 shadow-lg">
      <div className="flex justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Memory Lane</h1>
      </div>
      <p className="text-gray-700 text-lg mb-8">
        Capture your thoughts and experiences in a beautiful and easy-to-use
        journal.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {journals.map((journal) => (
          <div
            key={journal.id}
            className="bg-white shadow-md rounded overflow-hidden mb-4"
          >
            <div className="px-4 py-4">
              <p className="text-gray-700 mb-4">{journal.entry}</p>
            </div>
            <div className="px-4 pb-2 flex justify-between items-center border-t border-gray-200">
              <span className="text-lg font-bold text-gray-800 p-2">
                {journal.img && (
                  <img src={journal.img} alt={journal.name}/>
                )}
                
                {journal.name ? (
                  <>
                    {journal.name}
                  </>
                ) : (
                  <i>No Name</i>
                )}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(journal.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
