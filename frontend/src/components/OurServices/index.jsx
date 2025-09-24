import React, { useState, useEffect } from "react";
import "./style.css";
import Footer from "../Commontext/Footer";
import { fetchServices } from "../../api/servicesApi";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchServices();
      setServices(data);
    };
    loadData();
  }, []);

  const handleClick = (index) => {
    setSelectedService(index);
  };

  const handleClose = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div className="services-section">
           <h2 className="text-3xl md:text-3xl font-bold text-center mb-6">
          <span className="text-blue-600">Services We Offer</span>
        </h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="services-card" key={service.id}>
              <img
                src={service.logo}
                alt={service.title}
                className="services-logo"
              />
              <h4
                className="service-title"
                onClick={() => handleClick(index)}
              >
                {service.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Overlay Modal */}
        {selectedService !== null && (
          <div className="overlay">
            <div className="service-modal">
              <button className="close-btn" onClick={handleClose}>✕</button>
              <img
                src={services[selectedService].logo}
                alt={services[selectedService].title}
                className="banner-logo"
              />
              <h3>{services[selectedService].title}</h3>
              <p>{services[selectedService].details}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Services;
