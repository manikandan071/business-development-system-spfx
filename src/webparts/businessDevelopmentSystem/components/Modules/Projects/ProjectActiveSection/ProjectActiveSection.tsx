/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from "react";
import { useState } from "react";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
import Obligations from "../ProjectsSections/Obligations/Obligations";
import Calender from "../ProjectsSections/Calender/Calender";
import ToDoList from "../ProjectsSections/ToDoList/ToDoList";
import Documents from "../ProjectsSections/Documents/Documents";
import styles from "./ProjectActiveSection.module.scss";
import SectionTreeMap from "../SectionTreeMap/SectionTreeMap";
import CountryDetails from "../Cards/CountryDetails/CountryDetails";
import ProjectDetails from "../Cards/ProjectDetails/ProjectDetails";

const ProjectActiveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<any>({});
  return (
    <>
      <div style={{ width: "82%" }}>
        <SectionTreeMap
          CountryName="Sample Sample Sample Sample Sample Sample"
          ProjectName="sample Sample Sample Sample Sample Sample Sample"
          SectionName={activeTab?.displayName}
        />
        <div className={styles.project_Active_Section_wrapper}>
          <div style={{ width: "100%" }}>
            <ProjectNavBar setActiveTab={setActiveTab} />
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "100%" }}>
                <div>
                  {activeTab?.name === "Obligations" && <Obligations />}
                  {activeTab?.name === "Calender" && <Calender />}
                  {activeTab?.name === "Todos" && <ToDoList />}
                  {activeTab?.name === "Documents" && <Documents />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "18%",
        }}
      >
        <CountryDetails
          countryDetails={{
            Id: "C001",
            Name: "Sample Country",
            projectsCount: 5,
          }}
        />
        <ProjectDetails
          projectDetails={{
            Id: "P001",
            Name: "Sample Project",
            days: 30,
          }}
        />
      </div>
    </>
  );
};

export default ProjectActiveSection;
