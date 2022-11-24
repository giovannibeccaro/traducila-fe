import Logo from "./svgs/Logo";
import MenuIcon from "./svgs/MenuIcon";
import SearchIcon from "./svgs/SearchIcon";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Logo />
        <p>traducila</p>
      </div>
      <div className="navbar-items">
        <MenuIcon />
        <SearchIcon color="hsl(0, 0%, 17%)" />
      </div>
    </nav>
  );
};

export default Navbar;
