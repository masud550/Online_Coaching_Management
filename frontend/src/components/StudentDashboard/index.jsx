// C:\Projects\online_coaching_management\frontend\src\components\StudentDashboard\index.jsx
import React, { useEffect, useState } from "react";
import { getToken, clearTokens } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const token = getToken();
        if (!token) {
          setErrorMsg("No token found. Please log in again.");
          navigate("/login");
          return;
        }

        const res = await fetch("http://127.0.0.1:8000/api/dashboard/student/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          if (res.status === 401 || res.status === 403) {
            setErrorMsg(errData.error || "Unauthorized. Please log in again.");
            clearTokens();
            navigate("/login");
          } else {
            setErrorMsg(errData.error || "Failed to load dashboard.");
          }
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setErrorMsg("No enrolled courses found.");
        }
        setCourses(data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setErrorMsg("Something went wrong while loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (loading) return <p style={{ padding: "24px" }}>Loading dashboard...</p>;

  if (errorMsg) return <p style={{ padding: "24px", color: "red" }}>{errorMsg}</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Student Dashboard</h2>
      <div className="courses-list">
        {courses.map((enroll) => (
          <div
            key={enroll.id}
            className="course-card"
            onClick={() => navigate(`/course/${enroll.course.id}/videos`)}
          >
            <img
              src={`http://127.0.0.1:8000${enroll.course.image}`}
              alt={enroll.course.title}
              width="150"
            />
            <h3>{enroll.course.title}</h3>
            <p>Progress: {enroll.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
