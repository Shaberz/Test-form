/** @jsxImportSource @emotion/react */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import Fibonacci from './pages/Fibonacci';
import Collatz from './pages/Collatz';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      css={{
        color: '#000000',
        textDecoration: 'none',
        position: 'relative',
        "::after": {
          content: "''",
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '-1rem', 
          height: '2px',
          backgroundColor: isActive ? '#000000' : 'transparent',
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
        },
        ":hover::after": {
          transform: 'scaleX(1)',
          backgroundColor: '#000000',
        },
      }}
    >
      {children}
    </Link>
  );
};
const App: React.FC = () => {
  return (
    <Router>
      <nav
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center', 
          gap: '4rem',
          padding: '1rem 0',
          backgroundColor: '#FFFFFF',
          paddingLeft:'4rem',
          margin: 0,
          boxSizing: 'border-box',
          borderBottom: '1px solid #D9D9D9',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}
      >
        <NavLink to="/users">List Item</NavLink>
        <NavLink to="/fibonacci">Fibonacci</NavLink>
        <NavLink to="/collatz">Collatz Conjecture</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/fibonacci" element={<Fibonacci />} />
        <Route path="/collatz" element={<Collatz />} />
      </Routes>
    </Router> 
  );
};

export default App;
