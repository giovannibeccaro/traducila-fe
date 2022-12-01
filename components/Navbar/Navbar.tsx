import SearchBar from "../Searchbar/SearchBar";
import Logo from "../svgs/LogoIcon";
import MenuIcon from "../svgs/MenuIcon";
import SearchIcon from "../svgs/SearchIcon";
import { useRouter } from "next/router";
import SongInfo from "../SongInfo/SongInfo";
import NavLinks from "../NavLinks/NavLinks";
import { useState } from "react";
import Link from "next/link";
import iconColorCheck from "../../utils/iconColorCheck";

const Navbar = () => {
  //? route variables
  const router = useRouter();
  const route = router.pathname;

  //? page checks
  const isSingleSongPage =
    route.split("/").includes("traduzioni") && route.split("/").length > 2;
  const isTraduzioniPage = route === "/traduzioni";
  const isContattaciPage = route === "/contattaci";
  const isHomePage = route === "/";

  //? mobile menu modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={`navbar 
          ${isHomePage && "navbar-home"}
          ${isTraduzioniPage && "black-navbar traduzioni"} 
          ${isSingleSongPage && "black-navbar single-song"} 
          ${isContattaciPage && "navbar-contattaci"}`}
      >
        <div className="main-nav">
          <Link href="/" className="logo">
            <Logo />
            <p>traducila</p>
          </Link>
          <div className="navbar-items">
            {!isTraduzioniPage && !isHomePage && (
              <button>
                <SearchIcon color={iconColorCheck(route)} />
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
        {route === "/traduzioni" && <SearchBar parentSection="navbar" />}
        {isSingleSongPage && <SongInfo />}
      </nav>
    </>
  );
};

export default Navbar;
