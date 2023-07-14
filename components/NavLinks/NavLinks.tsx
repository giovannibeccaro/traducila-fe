import React, { useEffect } from "react";
import Link from "next/link";
import CrossIcon from "../svgs/CrossIcon";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  route: string;
};

const NavLinks: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  route,
}) => {
  //? if navbar menu on mobile is open, block body so that the user can't scroll in the background
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("nav-menu-on");
    }

    return () => {
      document.body.classList.remove("nav-menu-on");
    };
  }, [isMobileMenuOpen]);
  return (
    <section className={isMobileMenuOpen ? "nav-links open" : "nav-links"}>
      <button
        className={isMobileMenuOpen ? "close-menu open" : "close-menu"}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <CrossIcon />
      </button>
      <ul>
        <li>
          <Link
            className={route === "/" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={route === "/traduzioni" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
            href="/traduzioni"
          >
            Traduzioni
          </Link>
        </li>
        {/* <li>
          <Link
            className={route === "/chi-siamo" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
            href="/chi-siamo"
          >
            Chi siamo
          </Link>
        </li> */}
      </ul>
    </section>
  );
};

export default NavLinks;
