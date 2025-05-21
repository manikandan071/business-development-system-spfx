import * as React from "react";
import styles from "./Dashboard.module.scss";
import AppLoader from "../../Common/AppLoader/AppLoader";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard_container}>
      <AppLoader />
    </div>
  );
};

export default Dashboard;
