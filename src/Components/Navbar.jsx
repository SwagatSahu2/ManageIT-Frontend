import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    position: 'relative',
  };

  const logoStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const navbarLinksStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const navbarLinkStyle = {
    marginLeft: '20px',
  };

  const navbarToggleStyle = {
    display: 'none',
    flexDirection: 'column',
    cursor: 'pointer',
  };

  const barStyle = {
    width: '25px',
    height: '3px',
    margin: '4px 0',
    backgroundColor: 'white',
    borderRadius: '2px',
  };

  const activeLinksStyle = {
    position: 'absolute',
    top: '60px',
    left: '0',
    right: '0',
    backgroundColor: '#333',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'none', 
  };

  const mobileNavbarLinksActiveStyle = {
    ...activeLinksStyle,
    display: 'flex', 
  };


  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <a href="/">Employee Manager</a>
      </div>

      <div
        style={navbarToggleStyle}
        onClick={toggleMenu}
      >
        <span style={barStyle}></span>
        <span style={barStyle}></span>
        <span style={barStyle}></span>
      </div>

      <ul style={isMenuOpen ? mobileNavbarLinksActiveStyle : navbarLinksStyle}>
        <li style={navbarLinkStyle}><a href="/">Home</a></li>
        <li style={navbarLinkStyle}><a href="/about">About</a></li>
        <li style={navbarLinkStyle}><a href="/services">Services</a></li>
        <li style={navbarLinkStyle}><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
