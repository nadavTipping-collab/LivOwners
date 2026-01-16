import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/LivLogo.png';

interface ProtectedPageProps {
  onAuthenticated: () => void;
}

export default function ProtectedPage({ onAuthenticated }: ProtectedPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'Liv2026') {
      onAuthenticated();
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;500;600&display=swap');
        `}
      </style>

      <div 
        style={{ 
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#F9F6F0'
        }}
      >
        {/* Decorative Glows */}
        <div 
          style={{
            position: 'absolute',
            top: '-128px',
            left: '-128px',
            width: '384px',
            height: '384px',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 103, 55, 0.1)',
            filter: 'blur(120px)',
            pointerEvents: 'none'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-128px',
            right: '-128px',
            width: '384px',
            height: '384px',
            borderRadius: '50%',
            backgroundColor: 'rgba(62, 97, 127, 0.1)',
            filter: 'blur(120px)',
            pointerEvents: 'none'
          }}
        />

        {/* Main Container */}
        <div 
          style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          {/* Central Card */}
          <div 
            style={{ 
              width: '100%',
              maxWidth: '380px',
              borderRadius: '32px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              position: 'relative'
            }}
          >
            <div style={{ padding: '40px' }}>
              {/* Header Section */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginBottom: '40px'
                }}
              >
                {/* Logo */}
                <img 
                  src={logo} 
                  alt="LIV Collection" 
                  style={{
                    width: '96px',
                    height: '96px',
                    marginBottom: '24px',
                    objectFit: 'contain'
                  }}
                />
                
                {/* Title */}
                <h1 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: '#3E617F',
                    marginBottom: '12px',
                    textAlign: 'center'
                  }}
                >
                  OWNER'S CLUB
                </h1>
                
                {/* Subtitle */}
                <p 
                  style={{ 
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#666',
                    lineHeight: '1.5',
                    textAlign: 'center'
                  }}
                >
                  Please enter your password to access the portal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Input Field */}
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Password"
                    style={{ 
                      width: '100%',
                      height: '56px',
                      padding: '0 20px',
                      borderRadius: '12px',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: '#F9F6F0',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      color: '#333',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 2px rgba(212, 103, 55, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  
                  {/* Error Message */}
                  {error && (
                    <p 
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: '#D46737',
                        marginTop: '8px',
                        textAlign: 'center'
                      }}
                    >
                      {error}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  type="submit"
                  style={{ 
                    width: '100%',
                    height: '56px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: '#D46737',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    letterSpacing: '0.05em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  ACCESS PORTAL
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
              </form>

              {/* Footer */}
              <div style={{ marginTop: '40px' }}>
                <div 
                  style={{ 
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'rgba(62, 97, 127, 0.15)',
                    marginBottom: '16px'
                  }}
                />
                <p 
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '11px',
                    fontWeight: 400,
                    letterSpacing: '0.15em',
                    color: '#999',
                    textAlign: 'center'
                  }}
                >
                  SECURE ACCESS — LIV COLLECTION 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
