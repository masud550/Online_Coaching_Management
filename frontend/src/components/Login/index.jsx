// src/components/Login/index.jsx
import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getMe } from '../../api/userApi';
import { FaUserGraduate, FaChalkboardTeacher, FaUniversity } from 'react-icons/fa';
import Footer from '../Commontext/Footer';
import { saveTokens, getToken, clearTokens } from "../../api/authApi";

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [roleExtra, setRoleExtra] = useState(''); // student_id / subject / name
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  // new states for student fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState('');
  const [age, setAge] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const t = getToken();
    if (!t) return;

    (async () => {
      try {
        const me = await getMe(t);
        if (me?.role) {
          routeByRole(me.role);
        } else {
          clearTokens();
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        clearTokens();
      }
    })();
  }, []);

  const routeByRole = (role) => {
    if (role === 'teacher') navigate('/dashboard/teacher');
    else if (role === 'institution') navigate('/dashboard/institution');
    else navigate('/dashboard/student');
  };

  const handleRegister = async () => {
    if (!username || !password || !email) { alert('Fill all required fields'); return; }
    if (!agreed) { alert('You must agree to the terms'); return; }

    setLoading(true);
    try {
      const payload = { username, email, password, role: selectedRole };

      if (selectedRole === 'student') {
        payload.student_id = roleExtra || 'N/A';
        payload.full_name = fullName;
        payload.phone = phone;
        payload.education = education;
        payload.age = age;
      }
      if (selectedRole === 'teacher') payload.subject = roleExtra || 'N/A';
      if (selectedRole === 'institution') payload.name = roleExtra || 'N/A';

      const data = await registerUser(payload);
      saveTokens(data.access, data.refresh, rememberMe);
      routeByRole(data.role);
    } catch (err) {
      alert(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) { alert('Enter username & password'); return; }
    setLoading(true);
    try {
      const data = await loginUser({ username, password });
      saveTokens(data.access, data.refresh, rememberMe);
      const me = await getMe(data.access);
      routeByRole(me.role);
    } catch (err) {
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-page-container">
        <div className="login-page-frame">
          <span className="login-page-border-anim top" />
          <span className="login-page-border-anim right" />
          <span className="login-page-border-anim bottom" />
          <span className="login-page-border-anim left" />

          <div className="login-page-box">
            <div className="login-page-role-selection">
              <div
                className={`login-page-role-item ${selectedRole === 'student' ? 'active' : ''}`}
                onClick={() => { setSelectedRole('student'); setRoleExtra(''); }}
              >
                <FaUserGraduate size={20} />
                <span>Student</span>
              </div>
              <div
                className={`login-page-role-item ${selectedRole === 'teacher' ? 'active' : ''}`}
                onClick={() => { setSelectedRole('teacher'); setRoleExtra(''); }}
              >
                <FaChalkboardTeacher size={20} />
                <span>Teacher</span>
              </div>
              <div
                className={`login-page-role-item ${selectedRole === 'institution' ? 'active' : ''}`}
                onClick={() => { setSelectedRole('institution'); setRoleExtra(''); }}
              >
                <FaUniversity size={20} />
                <span>Institution</span>
              </div>
            </div>

            <h2 className="login-page-title">{isRegistering ? 'Register' : 'Login'}</h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="login-page-input"
            />

            {isRegistering && (
              <>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="login-page-input"
                />

                {selectedRole === 'student' && (
                  <>
                    <input
                      type="text"
                      placeholder="Student ID (provided by admin)"
                      value={roleExtra}
                      onChange={e => setRoleExtra(e.target.value)}
                      className="login-page-input"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="login-page-input"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="login-page-input"
                    />
                    <input
                      type="text"
                      placeholder="Education"
                      value={education}
                      onChange={e => setEducation(e.target.value)}
                      className="login-page-input"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={e => setAge(e.target.value)}
                      className="login-page-input"
                    />
                  </>
                )}

                {selectedRole === 'teacher' && (
                  <input
                    type="text"
                    placeholder="Subject"
                    value={roleExtra}
                    onChange={e => setRoleExtra(e.target.value)}
                    className="login-page-input"
                  />
                )}
                {selectedRole === 'institution' && (
                  <input
                    type="text"
                    placeholder="Institution name"
                    value={roleExtra}
                    onChange={e => setRoleExtra(e.target.value)}
                    className="login-page-input"
                  />
                )}
              </>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-page-input"
            />

            {isRegistering ? (
              <label className="login-page-checkbox" style={{ justifyContent: 'center' }}>
                <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                <span>
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="login-page-link">
                    terms and conditions
                  </a>
                </span>
              </label>
            ) : (
              <label className="login-page-checkbox">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <span>Remember Me</span>
              </label>
            )}

            <div className="login-page-btn-group">
              {isRegistering ? (
                <button onClick={handleRegister} className="login-page-btn" disabled={loading}>
                  {loading ? 'Creating...' : 'Sign Up'}
                </button>
              ) : (
                <button onClick={handleLogin} className="login-page-btn" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              )}

              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setAgreed(false);
                  setRememberMe(false);
                }}
                className="login-page-switch"
              >
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
