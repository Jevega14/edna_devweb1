import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="edna-header-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#232323', borderBottom: '1px solid #ccc' }}>
      <div className="edna-header-left">
        <h1 className="edna-header-title" style={{ cursor: 'pointer', fontSize: '1.5rem', margin: 0, color: '#ffffff' }} onClick={() => navigate('/')}>Edna Moda</h1>
      </div>
      <div className="edna-header-right">
        <span className="edna-logo-glasses" style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="50" height="25" viewBox="0 0 70 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="18" cy="18" rx="15" ry="15" stroke="#cccccc" strokeWidth="5" fill="#ffffff" />
            <ellipse cx="52" cy="18" rx="15" ry="15" stroke="#cccccc" strokeWidth="5" fill="#ffffff" />
            <rect x="18" y="15" width="19" height="6" fill="#cccccc" />
          </svg>
        </span>
      </div>
    </header>
  );
};

export default Header;