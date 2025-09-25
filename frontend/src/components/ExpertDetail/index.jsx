import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchExpertDetail } from "../../api/expertApi";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Footer from "../Commontext/Footer";

const ExpertDetail = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    fetchExpertDetail(id).then((data) => setExpert(data));
  }, [id]);

  if (!expert) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="home-page">
      <div className="p-8 md:px-20">
        <div className="flex flex-col items-center">
          <img
            src={expert.image}
            alt={expert.name}
            className="w-40 h-40 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-3xl font-bold">{expert.name}</h2>
          <p className="text-blue-600">{expert.position}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Expertise</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {expert.expertise.split(",").map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Qualification</h3>
            <p>{expert.qualification}</p>
            <div className="flex gap-6 mt-4 text-2xl">
              {expert.facebook && (
                <a
                  href={expert.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  <FaFacebook />
                </a>
              )}
              {expert.linkedin && (
                <a
                  href={expert.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700"
                >
                  <FaLinkedin />
                </a>
              )}
              {expert.twitter && (
                <a
                  href={expert.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-500"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {expert.portfolio.map((project, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg shadow-md hover:shadow-lg"
              >
                <h4 className="font-semibold">{project.title}</h4>
                <p className="text-white">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 underline mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ExpertDetail;
