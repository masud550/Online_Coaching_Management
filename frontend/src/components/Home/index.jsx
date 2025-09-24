// src/components/Home/index.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import './style.css';
import { Link } from 'react-router-dom';
import Footer from '../Commontext/Footer';

import { fetchHeadlines, fetchBanners, fetchMarketplaces, fetchClients } from '../../api/homeApi';
import { fetchCourses } from '../../api/coursesApi';

const Home = () => {
  const [headlines, setHeadlines] = useState([]);
  const [banners, setBanners] = useState([]);
  const [courses, setCourses] = useState([]);
  const [marketplaces, setMarketplaces] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchHeadlines().then(setHeadlines).catch(() => setHeadlines([]));
    fetchBanners().then(setBanners).catch(() => setBanners([]));
    fetchCourses().then(setCourses).catch(() => setCourses([]));
    fetchMarketplaces().then(setMarketplaces).catch(() => setMarketplaces([]));
    fetchClients().then(setClients).catch(() => setClients([]));
  }, []);

  const fullUrl = (imgPath) => {
    if (!imgPath) return '';
    if (imgPath.startsWith('http')) return imgPath;
    const base = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/api\/?$/, '');
    return `${base}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
  };

  return (
    <div className="home-page">
      {/* ========================= Moving Headline ========================= */}
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {headlines.map((h, i) => <span key={i}>{h.text}</span>)}
        </div>
        <div className="marquee-content">
          {headlines.map((h, i) => <span key={i}>{h.text}</span>)}
        </div>
      </div>

      {/* ========================= Motivation + Banner Section ========================= */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-20 gap-6">
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl font-bold text-blue-600">Learn Bangladesh</h2>
          <p className="text-white">
            Start your learning journey now! Explore our courses and build your skills.
            BUSINESS SCHOOL IT is a modern online learning platform for Digital Marketing,
            English Communication, and Freelancing...
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
            <div className="flex text-yellow-400 text-xl">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="text-white font-semibold">5.0</span>
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          {banners.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={banners.length > 1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {banners.map((b, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={fullUrl(b.image?.url || b.image || b.image_path || '')}
                    alt={`Banner ${i}`}
                    className="rounded-xl w-full h-64 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-white">Loading banners...</p>
          )}
        </div>
      </div>

      {/* ========================= Student Services ========================= */}
      <div className="py-12 px-4 md:px-20">
        <h2 className="text-3xl md:text-2xl font-bold text-center mb-2">
          <span className="text-blue-600">Student Services</span>
        </h2>
        <p className="text-center text-white mb-8">
          It is our responsibility to teach you practically and hands-on.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { img: "liveclass.png", title: "Live Classes" },
            { img: "support24.png", title: "24/7 Support" },
            { img: "zoom_support.png", title: "Backup Zoom Support" },
            { img: "team.png", title: "Dedicated Team" },
            { img: "recorded.png", title: "Recorded Classes" },
            { img: "buyer.png", title: "Buyers Outside Marketplace" },
          ].map((s, i) => (
            <div key={i} className="service-card">
              <img src={`/images/${s.img}`} alt={s.title} className="w-20 h-20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-500 mb-2">{s.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= Our Courses ========================= */}
      <div className="py-12 px-4 md:px-20">
        <h2 className="text-3xl md:text-3xl font-bold text-center mb-6">
          <span className="text-blue-600">Our Popular Courses</span>
        </h2>
        <p className="text-center text-white mb-10">Discover our most popular courses.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <div key={i} className="animated-card bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={fullUrl(c.image?.url || c.image || c.image_path || '')}
                alt={c.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">{c.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{c.description}</p>
                <div className="price-badge">Course fee: {c.fee}</div>
                <p className="text-gray-600 text-sm text-center mt-2">
                  {c.students_enrolled || (c.enrollments_count ? `${c.enrollments_count} students` : '')}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/courses" className="animated-border-btn text-xl">See All Courses →</Link>
        </div>
      </div>

      {/* ========================= Our Marketplace ========================= */}
      <div className="py-12 px-4 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          <span className="text-blue-600">Our Marketplace</span>
        </h2>
        <p className="text-center text-white mb-10">
          Learn how to succeed on top freelancing platforms.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
          {marketplaces.map((m, i) => (
            <div key={i} className="text-center">
              <img src={fullUrl(m.image)} alt={m.name} className="w-20 h-20 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-white">{m.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= Our Happy Clients ========================= */}
      <div className="py-12 px-4 md:px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          <span className="text-blue-600">Our Happy Clients</span>
        </h2>
        <p className="text-center text-white mb-10">
          Trusted by top universities, institutes, and organizations.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
          {clients.map((c, i) => (
            <img key={i} src={fullUrl(c.image)} alt={c.name} className="h-20 object-contain" />
          ))}
        </div>
      </div>

      {/* ========================= Student Success ========================= */}
      <div className="py-16 px-4 md:px-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-blue-600 mb-4">
            Business School IT Student Success
          </h2>
          <p className="text-xl text-white">Your Success is Our Pride</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-xl p-6 shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl font-bold text-orange-600 mb-3">5000+</div>
            <h3 className="text-xl font-semibold text-gray-800">Total Students</h3>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-xl p-6 shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl font-bold text-orange-600 mb-3">3000+</div>
            <h3 className="text-xl font-semibold text-gray-800">Successful Students</h3>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-yellow-50 rounded-xl p-6 shadow-md text-center hover:shadow-xl transition">
            <div className="text-5xl font-bold text-orange-600 mb-3">5+</div>
            <h3 className="text-xl font-semibold text-gray-800">Years of Success</h3>
          </div>
        </div>
      </div>

      {/* ========================= Footer ========================= */}
      <Footer />
    </div>
  );
};

export default Home;
