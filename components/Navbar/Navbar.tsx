import SearchBar from "../Searchbar/SearchBar";
import Logo from "../svgs/LogoIcon";
import MenuIcon from "../svgs/MenuIcon";
import SearchIcon from "../svgs/SearchIcon";
import { useRouter } from "next/router";
import SongInfo from "../SongInfo/SongInfo";
import NavLinks from "../NavLinks/NavLinks";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { iconColorCheck } from "../../utils/utils";
import SearchIconBack from "../svgs/SearchIconBack";
import { useOutsideAlerter } from "../../hooks/useOutsideAlerter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setNavbarHeight } from "../../store/navbar/navbarSlice";

const Navbar = () => {
  // load redux state for navbar height
  const { isTranslation } = useSelector((store: RootState) => store.swapButton);
  const dispatch = useDispatch();

  // route variables
  const router = useRouter();
  const route = router.pathname;

  // page checks
  const isArtistPage = router.route === "/[artistSlug]";
  const isSingleSongPage = router.asPath.includes("traduzione");
  const isTraduzioniPage = route === "/traduzioni";
  const isContattaciPage = route === "/contattaci";
  const isHomePage = route === "/";

  // mobile menu modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // searchbar toggle
  const [isSearchbarVisible, setIsSearchbarVisible] = useState(false);

  const searchBarRef = useRef(null);
  const otherSearchBarRef = useRef(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isSearchbarVisible) {
      document.body.classList.add("margin-top-searchbar");
      return () => {
        document.body.classList.remove("margin-top-searchbar");
      };
    }
  }, [isSearchbarVisible]);

  useEffect(() => {
    setIsSearchbarVisible(false);
    dispatch(
      setNavbarHeight(navbarRef.current?.clientHeight.toString() + "px")
    );
  }, [route, dispatch]);

  useOutsideAlerter(searchBarRef, () => setIsSearchbarVisible(false));
  useOutsideAlerter(otherSearchBarRef, () => setIsSearchbarVisible(false));

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar 
          ${isHomePage ? "navbar-home" : ""}
          ${isTraduzioniPage ? "black-navbar traduzioni" : ""} 
          ${isSingleSongPage ? "black-navbar single-song" : ""} 
          ${isContattaciPage ? "navbar-contattaci" : ""}
          ${isArtistPage ? "artist-page" : ""}`}
      >
        <div className="main-nav">
          <Link href="/" className="logo">
            <Logo />
            <p>traducila</p>
          </Link>
          <div className="navbar-items">
            {!isTraduzioniPage && !isHomePage && (
              <button
                className={isSearchbarVisible ? "go-back-btn" : "search-btn"}
                onClick={() => setIsSearchbarVisible(!isSearchbarVisible)}
              >
                {isSearchbarVisible ? (
                  <SearchIconBack color={iconColorCheck(route)} />
                ) : (
                  <SearchIcon color={iconColorCheck(route)} />
                )}
              </button>
            )}
            <button
              className={isMobileMenuOpen ? "close" : ""}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon color={iconColorCheck(route)} />
            </button>
            <NavLinks
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
        {route === "/traduzioni" && (
          <div ref={otherSearchBarRef}>
            <SearchBar parentSection="from-traduzioni" />
          </div>
        )}
        {isSearchbarVisible && (
          <div ref={searchBarRef}>
            <SearchBar parentSection="from-navbar" />
          </div>
        )}
        {isSingleSongPage && <SongInfo />}
      </nav>
    </>
  );
};

export default Navbar;
