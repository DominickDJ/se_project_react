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
            <img src={require("../../images/logo.svg").default} alt="logo" />
          </div>
          <div>{currentDate}</div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
          </div>
          <div>User Name</div>
          <div>
            <img src={require("../../images/avatar.svg").default} alt="logo" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
