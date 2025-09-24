import React from 'react';
import {
  FaFacebookF, FaLinkedinIn, FaYoutube, FaTwitter,
  FaInstagram, FaPinterestP
} from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <>
      {/* ========================= Decorative Strip ========================= */}
<div className="w-full h-16 bg-blue-600 
        bg-[radial-gradient(circle_at_10px_10px,_#2563eb_2px,_transparent_3px)]
        [background-size:20px_20px]">
</div>

{/* Footer */}
<footer className="bg-black text-gray-300 py-12 px-4 md:px-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

    {/* Left Section */}
    <div>
      <div className="text-2xl font-extrabold leading-tight">
        <span className="text-white">BUSINESS</span>{' '}
        <span className="text-blue-600">SCHOOL</span>{' '}
        <span className="text-yellow-400">IT</span>
      </div>
      <p className="text-sm mt-4 text-gray-400">
        At Business School IT, we prioritize hands-on learning with experienced mentors
        who bring real-world insights into every class.
      </p>

      {/* Social Icons */}
      <div className="flex flex-wrap items-center gap-4 mt-5 text-xl">
        <a href="https://www.facebook.com/" className="social-icon text-white" target="_blank"><FaFacebookF /></a>
        <a href="https://www.linkedin.com/" className="social-icon text-white" target="_blank"><FaLinkedinIn /></a>
        <a href="https://www.youtube.com/" className="social-icon text-white" target="_blank"><FaYoutube /></a>
        <a href="https://twitter.com/" className="social-icon text-white" target="_blank"><FaTwitter /></a>
        <a href="https://www.tiktok.com/" className="social-icon text-white" target="_blank"><SiTiktok /></a>
        <a href="https://www.instagram.com/" className="social-icon text-white" target="_blank"><FaInstagram /></a>
        <a href="https://www.pinterest.com/" className="social-icon text-white" target="_blank"><FaPinterestP /></a>
      </div>
    </div>

    {/* Middle Section */}
    <div>
      <h4 className="text-white font-bold tracking-wide mb-4">QUICK LINKS</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/courses" className="footer-link">Courses</Link></li>
        <li><Link to="/newsletter" className="footer-link">Newsletter</Link></li>
        <li><Link to="/about" className="footer-link">About Us</Link></li>
        <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
        <li><Link to="/mentors" className="footer-link">Mentors</Link></li>
      </ul>
    </div>

    {/* Right Section */}
    <div className="text-sm">
      <p className="mb-3">
        <a href="mailto:info@businessschoolit.com" className="text-white hover:underline">
          info@businessschoolit.com
        </a>
      </p>

      {/* Offices */}
      <p className="mb-3 leading-6">
        Head Office:{" "}
        <a href="https://www.google.com/maps/place/37%2F2+Fayenaz+Tower,+Purana+Paltan,+Dhaka"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline">
          37/2 Fayenaz Tower, Purana Paltan, Dhaka
        </a>
      </p>
      <p className="mb-3 leading-6">
        Corporate Office:{" "}
        <a href="https://www.google.com/maps/place/Abdul+Haque+Housing+Project,+Baigertek,+Dhaka+Cantonment,+Pallabi,+Dhaka-1206"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline">
          Abdul Haque Housing Project, Baigertek, Dhaka Cantonment, Pallabi, Dhaka-1206
        </a>
      </p>

      <p className="mb-1">
        Hotline: <a href="tel:01711671230" className="text-white hover:underline">01711-671230</a>
      </p>
      <p><span className="text-white">01711-671231</span></p>
    </div>
  </div>

  <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} Business School IT. All rights reserved.
  </div>
</footer>
    </>
  );
};

export default Footer;
