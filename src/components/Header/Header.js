import "./Header.css";
const Header = ({ onCreateModal }) => {
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <div>
            <img src={require("../images/logo.svg").default} alt="logo" />
          </div>
          <div>Date</div>
        </div>
        <div className="header__avatar-logo">
          <div>
            <button type="text" onClick={onCreateModal}>
              Add Clothes
            </button>
          </div>
          <div>Name</div>
          <div>
            <img src={require("../images/avatar.svg").default} alt="logo" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
// const currentDate = new Date().toLocaleString("default", {
//   month: "long",
//   day: "numeric",
// });
