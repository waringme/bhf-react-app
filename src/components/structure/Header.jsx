import React from "react";
import Logo from "../Logo";
import RedirectButton from "../RedirectButton";
import "./Header.scss";

const Header = () => {
  const navigations = [
    { label: "Information & Support", href: "/services" },
    { label: "How you can help", href: "/articles" },
    { label: "Shop", href: "/flightlist" },
    { label: "What we do", href: "/articles" },
    { label: "Donate", href: "/articles" },
    
  ];

  return (
    <header className="">
      <div className="container header">
        <div className="navigations-wrapper">
          <nav>
            {navigations.map(({ label, href }, index) => (
              <a
                key={`${href}_${index}`}
                href={href}
                className="font-size-large font-weight-medium color-light hover-effect"
              >
                {label}
              </a>
            ))}
          </nav>
          <Logo variant="british" />
        </div>
        <div className="buttons-wrapper">
          <RedirectButton className="transparent font-size-medium hover-effect">
            Login
          </RedirectButton>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
