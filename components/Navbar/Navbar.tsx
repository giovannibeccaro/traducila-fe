import SearchBar from "../Searchbar/SearchBar";
import Logo from "../svgs/Logo";
import MenuIcon from "../svgs/MenuIcon";
import SearchIcon from "../svgs/SearchIcon";
import { useRouter } from "next/router";
import SongInfo from "../SongInfo/SongInfo";

const Navbar = () => {
  const router = useRouter();
  const route = router.pathname;
  const isSingleSongPage =
    route.split("/").includes("traduzioni") && route.split("/").length > 2;
  const isTraduzioniPage =
    route.split("/").includes("traduzioni") && route.split("/").length === 2;

  const isContattaciPage = route.split("/").includes("contattaci");

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
            <MenuIcon color="white" />
            <SearchIcon color="white" />
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
          <MenuIcon
            color={isContattaciPage ? "hsl(340, 27%, 97%)" : "hsl(0, 0%, 17%)"}
          />
          <SearchIcon
            color={isContattaciPage ? "hsl(340, 27%, 97%)" : "hsl(0, 0%, 17%)"}
          />
        </div>
      </nav>
    );
};

export default Navbar;
