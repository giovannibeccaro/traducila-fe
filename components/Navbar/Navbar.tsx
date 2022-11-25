import { useEffect, useState } from "react";
import SearchBar from "../Searchbar/SearchBar";
import Logo from "../svgs/Logo";
import MenuIcon from "../svgs/MenuIcon";
import SearchIcon from "../svgs/SearchIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { setIsNavBlack } from "../../store/navbar/navbarSlice";
import { useRouter } from "next/router";

const Navbar = () => {
  const { isNavBlack } = useSelector((store: RootState) => store.navbar);
  const dispatch = useDispatch();
  const router = useRouter();
  const route = router.pathname;

  if (route.includes("/traduzioni"))
    return (
      <section className="black-navbar">
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
      </section>
    );
  else
    return (
      <nav className="navbar">
        <div className="logo">
          <Logo />
          <p>traducila</p>
        </div>
        <div className="navbar-items">
          <MenuIcon color="hsl(0, 0%, 17%)" />
          <SearchIcon color="hsl(0, 0%, 17%)" />
        </div>
      </nav>
    );
};

export default Navbar;
