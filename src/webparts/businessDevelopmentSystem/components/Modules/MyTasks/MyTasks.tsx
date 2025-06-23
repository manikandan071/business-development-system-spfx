/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import styles from "./MyTasks.module.scss";
// import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import ToDoList from "../Projects/ProjectsSections/ToDoList/ToDoList";
import { IProjectTaskDeatils } from "../../../../../Interface/ModulesInterface";
import LabelIcon from "@mui/icons-material/Label";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { generateStatusCounts } from "../../../../../Services/Tasks/TaskService";

const notStartIcon = require("../../../assets/images/png/notstarted.png");
const pendingIcon = require("../../../assets/images/png/inprogress.png");
const completedIcon = require("../../../assets/images/png/completed.png");
const overDueIcon = require("../../../assets/images/png/overdue.png");

const MyTasks: React.FC = () => {
  const [projectTasksData, setProjectTasksData] = useState<
    IProjectTaskDeatils[]
  >([]);
  const [statusCount, setStatusCount] = useState<any[]>([]);
  useEffect(() => {
    generateStatusCounts(projectTasksData, setStatusCount);
  }, [projectTasksData]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Progress":
        return {
          // icon: <LabelIcon className={`${styles.icon} ${styles.pending}`} />,
          icon: (
            <img
              src={pendingIcon}
              className={`${styles.icon} ${styles.pending}`}
            />
          ),
          className: `${styles.card} ${styles.pending_bg}`,
        };
      case "Overdue":
        return {
          // icon: (
          //   <AccessTimeIcon className={`${styles.icon} ${styles.overdue}`} />
          // ),
          icon: (
            <img
              src={overDueIcon}
              className={`${styles.icon} ${styles.pending}`}
            />
          ),
          className: `${styles.card} ${styles.overdue_bg}`,
        };
      case "Completed":
        return {
          // icon: (
          //   <CheckCircleIcon className={`${styles.icon} ${styles.completed}`} />
          // ),
          icon: (
            <img
              src={completedIcon}
              className={`${styles.icon} ${styles.pending}`}
            />
          ),
          className: `${styles.card} ${styles.completed_bg}`,
        };
      case "Not Started":
        return {
          // icon: (
          //   <CheckCircleIcon className={`${styles.icon} ${styles.completed}`} />
          // ),
          icon: (
            <img
              src={notStartIcon}
              className={`${styles.icon} ${styles.notstarted}`}
            />
          ),
          className: `${styles.card} ${styles.notStarted_bg}`,
        };
      default:
        return {
          icon: <LabelIcon className={`${styles.icon}`} />,
          className: `${styles.card}`,
        };
    }
  };

  return (
    <>
      {/* <div className="justify-space-between margin-right-20">
        <ModuleHeader title="My Tasks" />
      </div> */}
      <div className={styles.mytasks_container}>
        <div style={{ width: "82%" }}>
          <ToDoList
            ProjectDetails={{
              Id: 0,
              ProjectName: "",
              ProjectType: "",
              CountryName: "",
              CountryId: 0,
              City: "",
              GoogleLocation: "",
              BrandingPartner: "",
              UnitSize: "",
              Description: "",
              StartDate: "",
              EndDate: "",
              Status: "",
              ManageAccess: [],
              ManageAccessFormFormat: [],
              BreakPermission: false,
            }}
            setProjectTasksList={setProjectTasksData}
          />
        </div>
        <div
          style={{
            width: "18%",
          }}
        >
          <div
            style={{ color: "var(--section-header-secondary-font-color)" }}
            className={styles.status_overview}
          >
            Tasks Status Overview
          </div>
          {projectTasksData.length === 0 ? (
            <div className="no_data_found_message task">No records found.</div>
          ) : (
            <div className={styles.card_container}>
              {statusCount.map((item, index) => {
                const { icon, className } = getStatusStyles(item.status);
                return (
                  <div className={className} key={index}>
                    <div className={styles.left}>
                      {icon}
                      <span className={styles.count}>{item.status}</span>
                    </div>
                    <div className={styles.label}>{item.count}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTasks;
