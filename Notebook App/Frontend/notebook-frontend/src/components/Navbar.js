  import React, { useEffect, useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    useEffect(() => {

      console.log(location)
    }, [location])
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate('/login');
    };
  
    useEffect(() => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }, []);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">INoteBook</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item" >
              <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link btn btn-link">Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  export default Navbar
