/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import { useEffect, useState } from "react";
import styles from "./ProjectNavBar.module.scss";

interface IProjectNavBarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectNavBar: React.FC<IProjectNavBarProps> = ({ setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState("Obligations");

  const navOptions = [
    {
      name: "Obligations",
      displayName: "Contractual Obligations",
    },
    {
      name: "Calender",
      displayName: "Critical Dates Calendar",
    },
    {
      name: "Todos",
      displayName: "To-Do List",
    },
    {
      name: "Documents",
      displayName: "Documents",
    },
  ];
  useEffect(() => {
    setActiveIndex("Obligations");
    setActiveTab(navOptions[0]);
  }, []);

  return (
    <div className={styles.project_nav_bar_wrapper}>
      <div className={styles.project_nav_bar_options}>
        {navOptions.map((option, index) =>
          activeIndex === option?.name ? (
            <div
              key={index}
              className={styles.navBar_active_option}
              onClick={() => {
                setActiveIndex(option.name);
                setActiveTab(option);
              }}
            >
              <span>{option.displayName}</span>
            </div>
          ) : (
            <div
              key={index}
              className={styles.navBar_option}
              onClick={() => {
                setActiveIndex(option.name);
                setActiveTab(option);
              }}
            >
              <span>{option.displayName}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProjectNavBar;
