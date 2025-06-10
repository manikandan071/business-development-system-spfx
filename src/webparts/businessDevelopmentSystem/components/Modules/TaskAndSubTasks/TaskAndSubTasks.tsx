/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from "react";
import styles from "../MyTasks/MyTasks.module.scss";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import ToDoList from "../Projects/ProjectsSections/ToDoList/ToDoList";
import { useEffect, useState } from "react";
import { IProjectTaskDeatils } from "../../../../../Interface/ModulesInterface";
const notStartIcon = require("../../../assets/images/png/notstarted.png");
const pendingIcon = require("../../../assets/images/png/inprogress.png");
const completedIcon = require("../../../assets/images/png/completed.png");
const overDueIcon = require("../../../assets/images/png/overdue.png");
import LabelIcon from "@mui/icons-material/Label";

const TaskAndSubTasks = () => {
  const [projectTasksData, setProjectTasksData] = useState<
    IProjectTaskDeatils[]
  >([]);
  const [statusCount, setStatusCount] = useState<any[]>([]);

  const generateStatusCounts = (
    tasks: any[],
    setStatusCount: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const statusOrder = ["Not Started", "In Progress", "Completed", "Overdue"];
    const summaryMap: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const status = task?.Status || "Unknown";
      summaryMap[status] = (summaryMap[status] || 0) + 1;
    });

    const summaryArray = Object.entries(summaryMap).map(([status, count]) => ({
      status,
      count,
    }));
    setStatusCount(
      summaryArray?.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      )
    );
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "In Progress":
        return {
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

  useEffect(() => {
    generateStatusCounts(projectTasksData, setStatusCount);
  }, [projectTasksData]);

  return (
    <>
      <>
        <div className="justify-space-between margin-right-20">
          <ModuleHeader title="My Tasks" />
        </div>
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
          </div>
        </div>
      </>
    </>
  );
};

export default TaskAndSubTasks;
