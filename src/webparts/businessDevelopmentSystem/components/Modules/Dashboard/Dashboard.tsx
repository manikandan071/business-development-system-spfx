/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "./Dashboard.module.scss";
import AppLoader from "../../Common/AppLoader/AppLoader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCountryData,
  fetchEventsData,
  fetchRecentDocuments,
  fetchTasksData,
} from "../../../../../Services/Dashboard/DashboardService";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import {
  ICalenderDetails,
  ITasksDetails,
} from "../../../../../Interface/ModulesInterface";
import UpComingEvents from "./Components/UpcomingEvents/UpComingEvents";
import UpComingTasks from "./Components/UpComingTasks/UpComingTasks";
import RecentDocuments from "./Components/RecentDocuments/RecentDocuments";
import TaskActivityChart from "./Components/Charts/TaskActivityChart";
import CountryProjectChart from "./Components/Charts/CountryProjectChart";

const Dashboard: React.FC<{ viewAll: any }> = ({ viewAll }) => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [eventsData, setEventsData] = useState<ICalenderDetails[]>([]);
  const [tasksData, setTasksData] = useState<ITasksDetails[]>([]);
  const [documentsData, setDocumentsData] = useState<any[]>([]);
  console.log("tasksData", tasksData);

  useEffect(() => {
    fetchCountryData(dispatch);
    fetchEventsData(setEventsData);
    fetchTasksData(setTasksData);
    fetchRecentDocuments(setDocumentsData, setIsLoader);
  }, []);

  const viewAllMyTasks = () => {
    viewAll();
  };

  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.dashboard_container}>
      <ModuleHeader title="Dashboard" />
      <div className={styles.dashboard_wrapper}>
        <div className={styles.first_cloumn_wrapper}>
          <div className={styles.first_row_wrapper}>
            <div className={styles.task_container}>
              <UpComingTasks
                tasksData={tasksData}
                viewAllTasks={viewAllMyTasks}
              />
            </div>
            <div className={styles.event_container}>
              <UpComingEvents eventsData={eventsData} />
            </div>
          </div>
          <div className={`${styles.scond_row_wrapper} country_chart`}>
            <CountryProjectChart />
          </div>
        </div>
        <div className={styles.scond_column_wrapper}>
          <div className={styles.first_row_wrapper}>
            <div className={styles.documents_container}>
              <RecentDocuments documentsData={documentsData} />
            </div>
          </div>
          <div className={styles.scond_row_wrapper}>
            <TaskActivityChart taskData={tasksData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
