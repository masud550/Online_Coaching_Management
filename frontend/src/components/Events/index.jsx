// src/components/Event/index.jsx
import React, { useState } from "react";
import "./style.css";

const Event = () => {
  const [showSeminarForm, setShowSeminarForm] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);

  return (
    <div className="event-container">
      <h1 className="event-title">🎉 Events & Offers 🎉</h1>

      {/* ================= Ongoing Event ================= */}
      <section className="event-section">
        <h2>📌 Upcoming & Special Events</h2>
        <p>Check out our ongoing events and register directly!</p>
        <div className="event-card">
          {/* Google Form Embed */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScWhJjKmJ4ZN4Go7veGE1R-y6OVuXv_uJvwjL3V_NUCDNowQ/viewform?embedded=true"
            width="640"
            height="800"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Google Form"
          >
            Loading…
          </iframe>
        </div>
      </section>

      {/* ================= Free Seminar ================= */}
      <section className="event-section">
        <h2>🎓 Join Free Seminars</h2>
        <p>Register to attend our free seminars on different courses.</p>

        {/* Seminar Banner */}
        <div className="banner-box">
          <img
            src="/images/seminar-banner.jpg"
            alt="Free Seminar Banner"
            className="seminar-banner"
          />
        </div>

        <button
          className="btn"
          onClick={() => setShowSeminarForm(!showSeminarForm)}
        >
          {showSeminarForm ? "Close Seminar Registration" : "Register for Seminar"}
        </button>

        {showSeminarForm && (
          <form className="event-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Course Interested In" required />
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        )}
      </section>

      {/* ================= Course Discount ================= */}
      <section className="event-section">
        <h2>💰 Get Special Discounts</h2>
        <p>Fill up the form to grab exciting discounts on our courses.</p>

        <button
          className="btn"
          onClick={() => setShowDiscountForm(!showDiscountForm)}
        >
          {showDiscountForm ? "Close Discount Form" : "Apply for Discount"}
        </button>

        {showDiscountForm && (
          <form className="event-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Interested Course" required />
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Event;
