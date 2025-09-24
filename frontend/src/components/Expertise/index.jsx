import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExperts } from "../../api/expertApi";
import Footer from "../Commontext/Footer";
import "./style.css";

const Expertise = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    fetchExperts().then((data) => setExperts(data));
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black py-12 px-4 md:px-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-600">
          Our Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <Link to={`/expert/${expert.id}`} key={expert.id}>
              <div className="expert-card flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-green-500">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{expert.name}</h3>
                <p className="text-gray-600 text-sm">{expert.position}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Expertise;
