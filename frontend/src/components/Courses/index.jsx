// src/components/Courses/index.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../../api/coursesApi";
import Footer from "../Commontext/Footer";
import "./style.css";

const Courses = () => {
  const navigate = useNavigate();
  const [coursesData, setCoursesData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCoursesData(data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setMessage("⚠️ Failed to load courses.");
      }
    };
    getCourses();
  }, []);

  // Helper to get full image URL
  const fullUrl = (imgPath) => {
    if (!imgPath) return null; // return null instead of ""
    if (imgPath.startsWith("http")) return imgPath;
    const base = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/api\/?$/, "");
    return `${base}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };

  // Static benefits (can later be fetched from API)
  const benefitsData = [
    "You will get around 40 hours of online Zoom classes in each course.",
    "Every month there are special live Q&A and tips classes outside of the course.",
    "To ensure learning, we provide 1:1 support via Messenger/Telegram/Zoom.",
    "24/7 lifetime support group is available.",
    "You will get the opportunity to do group work and team projects.",
    "After each class, the recorded video will be provided so that you can watch it anytime.",
    "You will get a certificate after completing the course, which you can use for freelancing platforms or professional jobs.",
    "We will guide you on freelancing marketplaces and job opportunities abroad.",
    "From us, you will get lifetime support."
  ];

  return (
    <div className="home-page">
      <div className="courses-page">
        {/* Header */}
        <div className="courses-header px-4 md:px-20 py-12 text-center">
          <p className="text-blue-600 font-bold mb-10 text-3xl">
            Explore our popular courses and enroll now!
          </p>
        </div>

        {/* Message */}
        {message && <p className="text-center text-lg font-semibold text-green-600 mb-6">{message}</p>}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-4 md:px-20">
          {coursesData.map((course) => {
            const imgSrc = fullUrl(course.image?.url || course.image);
            return (
              <div key={course.id} className="animated-card rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-800 text-white">
                    No Image Available
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-green-600 mb-2">{course.title}</h3>
                  <p className="text-white text-sm mb-4">{course.description}</p>
                  <div className="price-badge mb-3">Course Fee: {course.fee} BDT</div>
                  <p className="text-gray-600 text-sm text-center mt-2">
                    {course.students_enrolled ||
                      (course.enrollments_count
                        ? `${course.enrollments_count} students enrolled`
                        : "")}
                  </p>
                  <button
                    className="animated-border-btn w-full mt-3"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="benefits-section flex flex-col md:flex-row items-center gap-10 px-4 md:px-20 py-16">
          <div className="flex-1">
            <h2 className="text-3xl text-blue-600 font-bold mb-4 text-center md:text-left">
              Benefits of Doing Our Courses
            </h2>
            <p className="text-white mb-6 text-center md:text-left">
              Expert IT Park will make you a skilled freelancer.
            </p>
            <ul className="space-y-3 text-white">
              {benefitsData.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">▶</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/images/benefits-illustration.png"
              alt="Course Benefits"
              className="max-w-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
