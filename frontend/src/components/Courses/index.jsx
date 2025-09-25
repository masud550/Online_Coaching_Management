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

  const fullUrl = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith("http")) return imgPath;
    const base = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/api\/?$/, "");
    return `${base}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  };
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
        {/* ========================= Why Choose Section ========================= */}
        <div className="why-choose-section px-4 md:px-20 py-12">
          <div className="why-choose-container flex flex-col md:flex-row gap-10">
            <div className="why-choose-text flex-1">
              <h2>
                Why <span>Choose Us</span>?
              </h2>
              <p>
                We are dedicated to providing high-quality courses that prepare
                students for the real-world freelancing and job market. With
                expert mentors, live classes, recorded lessons, and 24/7 support,
                we ensure that you gain the skills needed to build your career
                successfully.
              </p>
              <ul>
                <li>Professional instructors with real industry experience.</li>
                <li>Hands-on projects and assignments.</li>
                <li>Interactive live classes and Q&A sessions.</li>
                <li>
                  Lifetime access to learning materials and community.
                </li>
              </ul>
            </div>

            <div className="why-choose-video flex-1">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Intro Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      {/* ========================= Payment Section ========================= */}
<div className="transaction-section mt-12 px-2 md:px-10">
  <h3 className="text-2xl font-bold text-center mb-6">
    Payment Methods
  </h3>
  <p className="text-center text-gray-600 mb-6">
    Please make your payment via one of the following methods and keep the
    transaction screenshot.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Bkash */}
    <div className="txn-card p-6 rounded-lg shadow-md text-center">
      <img
        src="/images/bkash.png"
        alt="Bkash"
        className="h-12 mx-auto mb-3"
      />
      <h4 className="text-xl font-semibold text-pink-600 mb-2">Bkash</h4>
      <p className="mb-2 text-gray-800">
        Number: <strong>017XXXXXXXX</strong>
      </p>
      <p className="text-gray-800">Type: Personal / Merchant (specify)</p>
    </div>

    {/* Nagad */}
    <div className="txn-card p-6 rounded-lg shadow-md text-center">
      <img
        src="/images/nagad.png"
        alt="Nagad"
        className="h-12 mx-auto mb-3"
      />
      <h4 className="text-xl font-semibold text-orange-600 mb-2">Nagad</h4>
      <p className="mb-2 text-gray-800">
        Number: <strong>018XXXXXXXX</strong>
      </p>
      <p className="text-gray-800">Type: Personal / Merchant (specify)</p>
    </div>

    {/* Bank */}
    <div className="txn-card p-6 rounded-lg shadow-md text-center">
      <img
        src="/images/bank.png"
        alt="Bank"
        className="h-12 mx-auto mb-3"
      />
      <h4 className="text-xl font-semibold text-blue-600 mb-2">
        Bank Transfer
      </h4>
      <p className="mb-1 text-gray-800">
        Account Name: <strong>BUSINESS SCHOOL IT</strong>
      </p>
      <p className="mb-1 text-gray-800">
        Account No: <strong>123456789</strong>
      </p>
      <p className="text-gray-800">
        Bank: Dutch-Bangla Bank, Dhaka Branch
      </p>
    </div>
  </div>
</div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
