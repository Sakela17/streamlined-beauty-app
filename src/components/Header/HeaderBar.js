import React from 'react';
import { Link } from 'react-router-dom';
import NavbarCollapsMenu from './NavbarCollapseMenu';

import './HeaderBar.css';

const HeaderBar = () => {
  return (
    <header className="navbar-header">
      <nav>
        <div className="">
          <Link to="/menu">
            <button className="navbar-toggle" /*aria-expanded={}*/ type="button">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </Link>
          {/*<button className="navbar-toggle navbar-close" type="button">*/}
            {/*<span className="icon-bar"></span>*/}
            {/*<span className="icon-bar"></span>*/}
            {/*<span className="icon-bar"></span>*/}
          {/*</button>*/}
        </div>
        {/*<NavbarCollapsMenu/>*/}
        {/*<div className="navbar-collapse"></div>*/}
      </nav>
    </header>
  );
};

export default HeaderBar;
