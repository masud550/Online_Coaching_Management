// src/components/CourseDetails/index.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById, enrollCourse } from "../../api/coursesApi";
import { getToken } from "../../api/authApi"; 

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load course.");
      }
    };
    loadCourse();
  }, [id]);

  const fullUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http')) return imgPath;
    const base = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/api\/?$/, '');
    return `${base}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
  };

  const handleEnroll = async () => {
    const token = getToken();
    if (!token) {
      setMessage("⚠️ Please log in first.");
      return;
    }
    try {
      const res = await enrollCourse(id, token);
      setMessage(res.message || "✅ Enrolled successfully!");
      if (res.message && res.message.toLowerCase().includes("enrolled")) {
        navigate("/dashboard/student");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Enrollment failed.");
    }
  };

  if (!course) return <p className="text-center text-white mt-12">Loading...</p>;

  return (
    <div className="course-feature-page px-4 md:px-20 py-12">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img src={ fullUrl(course.image?.url || course.image || '') } alt={course.title} className="w-full rounded-lg shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold text-green-600">{course.title}</h2>
          <p>{course.description}</p>

          <h3 className="text-2xl font-bold mt-4 text-blue-600">Benefits</h3>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            {course.benefits && course.benefits.map((b, idx) => <li key={idx}>{b}</li>)}
          </ul>

          <button className="animated-border-btn mt-6" onClick={handleEnroll}>Enroll</button>
          {message && <p className="mt-4 text-blue-600">{message}</p>}
        </div>
      </div>

      <h3 className="text-2xl font-bold mt-10 mb-4 text-blue-600">Course Videos</h3>
      {course.videos && course.videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {course.videos.map((video) => (
            <div key={video.id}>
              <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
              <video src={video.video} controls className="w-full rounded-lg shadow-md" />
            </div>
          ))}
        </div>
      ) : (
        <p>No videos yet or you are not enrolled.</p>
      )}
    </div>
  );
};

export default CourseDetails;
