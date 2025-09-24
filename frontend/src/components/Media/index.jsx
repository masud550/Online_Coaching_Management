// src/components/Media/index.jsx
import React, { useEffect, useState } from "react";
import Footer from "../Commontext/Footer";
import "./style.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const Media = () => {
  const [mediaPersons, setMediaPersons] = useState([]);

  useEffect(() => {
    const fetchMediaPersons = async () => {
      try {
        const res = await fetch(`${API_BASE}/media-persons/`);
        if (!res.ok) throw new Error("Failed to fetch media persons");
        const data = await res.json();
        setMediaPersons(data);
      } catch (error) {
        console.error("Error fetching media persons:", error);
      }
    };

    fetchMediaPersons();
  }, []);

  return (
    <div>
      <div className="media-section home-page px-4 md:px-20 py-12">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">Meet Our Media Team</p>
          <h2 className="text-3xl font-bold">Our Media Persons</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mediaPersons.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500"
              />
              <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
              <p className="text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Media;
