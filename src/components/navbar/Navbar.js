import React from "react";
import { Link, } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    // const location = useLocation();
    let history = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        history('/login');
    }
    return (
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <div className="container-fluid">
        //     <Link className="navbar-brand" to="/">
        //         ENoteBook
        //     </Link>
        //     <button
        //         className="navbar-toggler"
        //         type="button"
        //         data-bs-toggle="collapse"
        //         data-bs-target="#navbarSupportedContent"
        //         aria-controls="navbarSupportedContent"
        //         aria-expanded="false"
        //         aria-label="Toggle navigation"
        //     >
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li className="nav-item">
        //             <Link className= {`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
        //             Home
        //             </Link>
        //         </li>
        //         <li className="nav-item">
        //             <Link className= {`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
        //             about
        //             </Link>
        //         </li>
        //         </ul>
                // {!localStorage.getItem('token') ? <form className="d-flex">
                // <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                // <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
                // </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
        //     </div>
        //     </div>
        // </nav>
        <div className={styles.navbar}>
            <div className={styles.navContainer}>
                <span className={styles.logo}>ENoteBook</span>
                {!localStorage.getItem('token') ? 
                <div className={styles.navItems}>
                    <Link className={styles.navButton} to="/signup" role="button">Register</Link>
                    <Link className={styles.navButton} to="/login" role="button">Login</Link>
                </div>
                : <button onClick={handleLogout} className={styles.navButton}>Logout</button>}
            </div>
        </div>
    );
};

export default Navbar;
