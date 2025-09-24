// src/components/Gallery/index.jsx
import React, { useEffect, useState } from "react";
import Footer from "../Commontext/Footer";
import "./style.css";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE}/gallery-items/`);
        if (!res.ok) throw new Error("Failed to fetch gallery items");
        const data = await res.json();
        setGalleryItems(data);
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div>
      <div className="home-page gallery-section px-4 md:px-20 py-12">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">Our Work</p>
          <h2 className="text-3xl font-bold">Gallery</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {item.type === "image" ? (
                <img
                  src={item.file}
                  alt={item.title}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <video controls className="w-full h-60 object-cover">
                  <source src={item.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-500 text-sm">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;
