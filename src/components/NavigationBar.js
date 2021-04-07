import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlaylists } from "../pages/playlists-context";

export function NavigationBar() {
  const [expandNavbar, setExpandNavbar] = useState(false);
  return (
    <div className="navigation">
      <header className="header">
        <div className="container">
          <Hamberger setExpandNavbar={setExpandNavbar} />
          <Brand />
          <Navigation expandNavbar={expandNavbar} />
        </div>
      </header>
    </div>
  );
}

function Navigation({ expandNavbar }) {
  const { watchLater } = usePlaylists();
  return (
    <nav className={`nav ${expandNavbar ? "" : "nav-hide"}`}>
      {/* TODO: Add search functionality */}
      {/* <div class="nav__search-bar">
        {<SearchBar />}
      </div> */}
      <ul className="nav__list nav__list--primary">
        <NavigationItem route="/">Home</NavigationItem>
        <NavigationItem route="playlists">Playlists</NavigationItem>
        <NavigationItem route="playlists/history">History</NavigationItem>
        <NavigationItem route="playlists/watch-later">
          Watch Later
          <NotificationBadge length={watchLater.length} />
        </NavigationItem>
        <NavigationItem route="playlists/liked-videos">
          Liked Videos
        </NavigationItem>
      </ul>
    </nav>
  );
}

function NotificationBadge({ length }) {
  return (
    length !== 0 && (
      <span className="badge--smaller position-badge--smaller bg-red-600">
        {length}
      </span>
    )
  );
}

function NavigationItem({ route, children }) {
  return (
    <li className="nav__item pos-rel">
      <NavLink
        to={route}
        end
        className="nav__link"
        activeClassName="nav__link--active"
      >
        {children}
      </NavLink>
    </li>
  );
}

function Brand() {
  return (
    <NavLink to="/">
      <img
        className="img logo clickable"
        src="https://purvasheth.github.io/Ceres-Component-Lib/images/logo.png"
        alt="logo"
      />
    </NavLink>
  );
}

function Hamberger({ setExpandNavbar }) {
  return (
    <button
      className="btn hamburger btn-wishlist font--primary"
      onClick={() => setExpandNavbar((prev) => !prev)}
    >
      <i className="fa fa-bars"></i>
    </button>
  );
}
