import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  const handleShowLogin = () => {
    navigate("/login");
  };

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="header-background">
      <Navbar className="navbarCSS" expand="lg">
        <Navbar.Brand href="/" className="navTitle">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto navItemCSS">
            {user ? (
              <Button variant="outline-light" onClick={handleShowLogout} className="navButton">
                Logout
              </Button>
            ) : (
              <Button variant="outline-light" onClick={handleShowLogin} className="navButton">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
