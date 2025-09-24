import React, { useEffect, useState } from "react";
import { getToken } from "../../api/authApi";
import { useParams } from "react-router-dom";

const CourseVideos = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = getToken();
        const res = await fetch(`http://127.0.0.1:8000/api/courses/${id}/videos/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Cannot fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [id]);

  if (loading) return <p>Loading videos...</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h2>Course Videos</h2>
      {videos.length === 0 ? (
        <p>No videos available yet</p>
      ) : (
        <div className="video-list">
          {videos.map((v) => (
            <div key={v.id} className="video-card">
              <h4>{v.title}</h4>
              <video width="500" controls>
                <source src={`http://127.0.0.1:8000${v.video}`} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseVideos;
