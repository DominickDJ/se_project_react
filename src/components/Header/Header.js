import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

import "./Header.css";
const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <Link to="/">
              <img src={require("../../images/logo.svg").default} alt="logo" />
            </Link>
          </div>
          <div>{currentDate}</div>
        </div>
        <div className="header__avatar-logo">
          <ToggleSwitch />
          <div>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
          </div>
          <Link to="/profile">Dominick Harper</Link>
          <div>
            <img src={require("../../images/avatar.svg").default} alt="logo" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
