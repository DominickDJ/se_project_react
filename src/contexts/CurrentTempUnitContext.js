import React from "react";

const CurrentTempUnitContext = React.createContext({
  CurrentTempUnit: "",
  handleTogggleSwitchChange: () => {},
});

export { CurrentTempUnitContext };
