import React from 'react';

import './Header.css';

const Header = ({isLoggedIn, firstName, showLogin, logOut}) => {
  return (
    <header>
      <div className='header-wrapper'>
        {isLoggedIn ? (
          <p>Hello, {firstName} | <button className='login' onClick={logOut}>Log out</button></p>
        ) : (
            <p><button className='login'></button></p>
        )}
      </div>
    </header>
  );
}

export default Header;