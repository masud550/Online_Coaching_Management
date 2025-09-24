//C:\Projects\online_coaching_management\frontend\src\components\Contact\index.jsx
import React, { useState } from 'react';
import './style.css';
import { FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../Commontext/Footer';
import { sendContactMessage } from '../../api/contactApi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await sendContactMessage(formData);
      setFeedback({
        type: 'success',
        message: '✅ Message sent successfully!'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || '❌ Something went wrong.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="contact-container">
          {/* Left Info */}
          <div className="contact-info">
            <h2 className="contact-heading">
              Contact <span>With Us</span>
            </h2>
            <p>
              <FaPhoneAlt className="icon" /> Phone: 01829-234069
            </p>
            <p>
              <FaEnvelope className="icon" /> Email: businessschoolit@gmail.com
            </p>
            <p>
              <FaGlobe className="icon" /> Website: www.businessschoolit.com
            </p>
            <p>
              <FaMapMarkerAlt className="icon" /> Address: Silver Hall Palace
              (3rd Floor), Tomchom Bridge (Opposite New Hostel), Cumilla
            </p>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              rows="4"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {feedback && (
              <p className={`feedback ${feedback.type}`}>{feedback.message}</p>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
