import React from 'react';
const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="/#/login">To Do</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="/login">Sign out</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;