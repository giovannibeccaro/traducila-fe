import SearchBar from "../Searchbar/SearchBar";
import Logo from "../svgs/LogoIcon";
import MenuIcon from "../svgs/MenuIcon";
import SearchIcon from "../svgs/SearchIcon";
import { useRouter } from "next/router";
import SongInfo from "../SongInfo/SongInfo";
import NavLinks from "../NavLinks/NavLinks";
import { useState } from "react";

const Navbar = () => {
  //? route variables
  const router = useRouter();
  const route = router.pathname;

  //? page checks
  const isSingleSongPage =
    route.split("/").includes("traduzioni") && route.split("/").length > 2;
  const isTraduzioniPage = route === "/traduzioni";
  const isContattaciPage = route === "/contattaci";

  //? mobile menu modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (route.includes("traduzioni"))
    return (
      <section
        className={
          isTraduzioniPage ? "black-navbar traduzioni" : "black-navbar"
        }
      >
        <nav className="navbar">
          <div className="logo">
            <Logo />
            <p>traducila</p>
          </div>
          <div className="navbar-items">
            <button
              className={isMobileMenuOpen ? "close" : ""}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon color="white" />
            </button>
            <NavLinks
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
            {!isTraduzioniPage && (
              <button>
                <SearchIcon color="white" />
              </button>
            )}
          </div>
        </nav>
        {route === "/traduzioni" && <SearchBar parentSection="navbar" />}
        {isSingleSongPage && <SongInfo />}
      </section>
    );
  else
    return (
      <nav
        className={
          isContattaciPage ? "navbar navbar-contattaci" : "navbar unfixed"
        }
      >
        <div className="logo">
          <Logo />
          <p>traducila</p>
        </div>
        <div className="navbar-items">
          <button
            className={isMobileMenuOpen ? "close" : ""}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <MenuIcon
              color={
                isContattaciPage ? "hsl(340, 27%, 97%)" : "hsl(0, 0%, 17%)"
              }
            />
          </button>
          <NavLinks
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
          {!isTraduzioniPage && (
            <button>
              <SearchIcon
                color={
                  isContattaciPage ? "hsl(340, 27%, 97%)" : "hsl(0, 0%, 17%)"
                }
              />
            </button>
          )}
        </div>
      </nav>
    );
};

export default Navbar;
