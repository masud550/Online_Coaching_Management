// ================= StudentDashboard.jsx =================
import React, { useEffect, useState } from "react";
import { getToken, clearTokens } from "../../api/authApi";
import { API_BASE, MEDIA_BASE } from "../../api/config";
import Login from "../Login"; 

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showLogin, setShowLogin] = useState(false); 

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const token = getToken();
        if (!token) {
          setShowLogin(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/dashboard/student/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          if (res.status === 401 || res.status === 403) {
            setErrorMsg(errData.error || "Unauthorized. Please log in again.");
            clearTokens();
            setShowLogin(true); 
          } else {
            setErrorMsg(errData.error || "Failed to load dashboard.");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setErrorMsg("No enrolled courses found.");
        } else {
          setCourses(data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setErrorMsg("Something went wrong while loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p style={{ padding: "24px" }}>Loading dashboard...</p>;

  if (showLogin) {
    return <Login />;
  }

  if (errorMsg) {
    return (
      <div style={{ padding: "24px" }}>
        <p style={{ color: "red" }}>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div style={{ padding: "24px" }}>
        <h2>🎓 Student Dashboard</h2>
        <div className="courses-list">
          {courses.map((enroll) => (
            <div key={enroll.id} className="course-card">
              <img
                src={`${MEDIA_BASE}${enroll.course.image}`}
                alt={enroll.course.title}
                width="200"
              />
              <h3>{enroll.course.title}</h3>
              <p>Progress: {enroll.progress}%</p>

              {/* Show videos inside dashboard */}
              {enroll.course.videos && enroll.course.videos.length > 0 ? (
                <div className="videos-section">
                  <h4>Course Videos:</h4>
                  {enroll.course.videos.map((video) => (
                    <div key={video.id} style={{ marginBottom: "16px" }}>
                      <h5>{video.title}</h5>
                      <video
                        src={`${MEDIA_BASE}${video.video}`}
                        controls
                        width="400"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No videos available.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
