import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSuccessDetail } from "../../api/successApi";
import Footer from "../Commontext/Footer";

const SuccessDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const placeholder = "/images/student_placeholder.jpg";

  useEffect(() => {
    fetchSuccessDetail(id)
      .then((data) => {
        setStory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center p-6">Loading...</p>;
  }

  if (!story) {
    return <p className="text-center p-6 text-red-500">Story not found.</p>;
  }

  // 🛠 Ensure we handle nested objects/arrays safely
  const achievements =
    story.achievements && Array.isArray(story.achievements)
      ? story.achievements
      : [];

  const journey =
    typeof story.story === "string"
      ? story.story
      : JSON.stringify(story.story, null, 2); // fallback if object

  return (
    <div className="home-page">
      <div className="p-8 md:px-20">
        {/* =================== Student Profile =================== */}
        <div className="flex flex-col items-center">
          <img
            src={story.image || placeholder}
            alt={story.name || "Student"}
            className="w-40 h-40 rounded-full border-4 border-blue-500 mb-4 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = placeholder;
            }}
          />
          <h2 className="text-3xl font-bold text-green-600">
            {story.name || "Unknown Student"}
          </h2>
          <p className="text-gray-500">{story.course || "No course info"}</p>
        </div>

        {/* =================== Story Details =================== */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Their Journey</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {journey}
            </p>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Achievements</h3>
            {achievements.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-700">
                {achievements.map((item, index) => (
                  <li key={index}>
                    {typeof item === "string" ? item : JSON.stringify(item)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No specific achievements listed.</p>
            )}
          </div>
        </div>

        {/* =================== Extra Info =================== */}
        {story.testimonial && (
          <div className="mt-10 p-6 border rounded-lg shadow-md bg-gray-50">
            <h3 className="text-2xl font-bold mb-3 text-blue-600">
              Testimonial
            </h3>
            <p className="italic text-gray-700">
              "
              {typeof story.testimonial === "string"
                ? story.testimonial
                : JSON.stringify(story.testimonial)}
              "
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SuccessDetail;
