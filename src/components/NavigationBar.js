import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePlaylists } from "../pages/playlists-context";
import { SET_VIDEOS } from "../pages/videos-reducer";
import { useAxios } from "../useAxios";
import { API_VIDEOS, API_PLAYLISTS } from "../urls";
import { useVideos } from "../pages/videos-context";
import {
  SET_LIKED_VIDEOS_ID,
  SET_PLAYLISTS,
  SET_WATCH_LATER_ID,
} from "../pages/playlists-reducer";
import { SearchBar } from "./SearchBar";

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
  const { videosDispatch } = useVideos();
  const { playlistsDispatch } = usePlaylists();
  const { getData: getVideos } = useAxios(API_VIDEOS);
  const { getData: getPlaylists } = useAxios(API_PLAYLISTS);

  useEffect(() => {
    (async () => {
      const fetchedVideos = await getVideos();
      if (fetchedVideos) {
        videosDispatch({ type: SET_VIDEOS, fetchedVideos });
      }
    })();
    (async () => {
      const fetchedPlaylists = await getPlaylists();
      if (fetchedPlaylists) {
        setDefaultPlaylistIds(fetchedPlaylists);
        playlistsDispatch({ type: SET_PLAYLISTS, fetchedPlaylists });
      }
    })();
  }, []);

  const setDefaultPlaylistIds = (playlists) => {
    let isLikedVideosIdSet = false;
    let isWatchLaterIdSet = false;
    let i = 0;
    while (
      (!isLikedVideosIdSet || !isWatchLaterIdSet) &&
      i < playlists.length
    ) {
      const { defaultPlaylist, _id, name } = playlists[i];
      if (defaultPlaylist) {
        if (name === "Liked Videos") {
          isLikedVideosIdSet = true;
          playlistsDispatch({ type: SET_LIKED_VIDEOS_ID, playlistId: _id });
        } else {
          isWatchLaterIdSet = true;
          playlistsDispatch({ type: SET_WATCH_LATER_ID, playlistId: _id });
        }
      }
      i++;
    }
  };

  return (
    <nav className={`nav ${expandNavbar ? "" : "nav-hide"}`}>
      <div className="nav__search-bar">{<SearchBar />}</div>
      <ul className="nav__list nav__list--primary">
        <NavigationItem route="/">Home</NavigationItem>
        <NavigationItem route="playlists">Playlists</NavigationItem>
        <NavigationItem route="history">History</NavigationItem>
      </ul>
    </nav>
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
