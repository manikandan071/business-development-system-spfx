import * as React from "react";
import "./AppLoader.css";

const AppLoader: React.FC = () => {
  //   return <div className="dashboard-loader"></div>;
  //   return <div className="countries-loader"></div>;
  return (
    <div className="loader-container">
      <span className="loader" />
    </div>
  );
};

export default AppLoader;
