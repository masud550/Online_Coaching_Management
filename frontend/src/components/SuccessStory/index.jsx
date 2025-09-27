import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Commontext/Footer";
import "./style.css";
import { fetchSuccessStories } from "../../api/successApi";

const SuccessStory = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchSuccessStories()
      .then((data) => {
        if (mounted) {
          setStories(data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching success stories:", err);
        if (mounted) {
          setError("Could not load success stories.");
          setLoading(false);
        }
      });
    return () => (mounted = false);
  }, []);

  const placeholder = "/images/student_placeholder.jpg";

  return (
    <div className="home-page">
      <div className="success-story-section px-4 md:px-20 py-12">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-3xl">
            See how our students achieved success after completing our courses
          </p>
        </div>

        {loading && <p className="text-center text-white">Loading stories...</p>}
        {error && <p className="text-center text-blue-400">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stories.length === 0 && (
              <p className="text-center text-white">No success stories yet.</p>
            )}

            {stories.map((story) => (
              <Link to={`/success/${story.id}`} key={story.id}>
                <div className="success-card bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer">
                  <div className="mb-4">
                    <img
                      src={story.image ? story.image : placeholder}
                      alt={story.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholder;
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-1">
                    {story.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{story.course}</p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {story.story}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SuccessStory;
