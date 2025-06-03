/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "./Dashboard.module.scss";
import AppLoader from "../../Common/AppLoader/AppLoader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCountryData } from "../../../../../Services/Dashboard/DashboardService";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCountryData(dispatch);
  }, []);
  return (
    <div className={styles.dashboard_container}>
      <AppLoader />
    </div>
  );
};

export default Dashboard;
