import React from "react";
import Link from "next/link";
import CrossIcon from "../svgs/CrossIcon";

type Props = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavLinks: React.FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <section className={isMobileMenuOpen ? "nav-links open" : "nav-links"}>
      <button
        className={isMobileMenuOpen ? " open" : ""}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <CrossIcon />
      </button>
      <ul>
        <li>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/traduzioni">
            Traduzioni
          </Link>
        </li>
        <li>
          <Link onClick={() => setIsMobileMenuOpen(false)} href="/contattaci">
            Chi siamo
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default NavLinks;
