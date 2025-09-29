import lightIcon from "../assets/SecurBank-icon-light.svg";
import darkIcon from "../assets/SecurBank-icon-dark.svg";
import british from "../assets/BHF-logo-desktop.svg"

import "./Logo.scss";

/**
 * @param {string} variant - "light" or "dark"
 */
const Logo = ({ variant }) => {
  const icon = variant === "british" ? british : null;
  return (
    <a href="/" className="hover-effect logo-wrapper">
      <img src={icon} alt="British Heart Foundation" className={"icon " + variant} />
    </a>
  );
};

export default Logo;
