//C:\Projects\online_coaching_management\frontend\src\components\Loader\index.jsx
import React from 'react';
import './style.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="spinner-container">
        <div className="spinner"></div>
        <img src="/images/logo.jpg" alt="Logo" className="center-logo" />
      </div>
    </div>
  );
};

export default Loader;
