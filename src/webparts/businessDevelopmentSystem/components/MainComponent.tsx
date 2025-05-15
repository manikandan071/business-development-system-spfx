import * as React from "react";
import NavBar from "./Modules/NavBar/NavBar";
// import styles from "./MainComponent.module.scss";

const MainComponent = () => {
  return (
    <div>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ width: "20%" }}>
          <NavBar />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
