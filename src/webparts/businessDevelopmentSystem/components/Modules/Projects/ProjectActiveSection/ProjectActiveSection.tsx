/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from "react";
import { useEffect, useState } from "react";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
import Obligations from "../ProjectsSections/Obligations/Obligations";
import Calender from "../ProjectsSections/Calender/Calender";
import ToDoList from "../ProjectsSections/ToDoList/ToDoList";
import Documents from "../ProjectsSections/Documents/Documents";
import styles from "./ProjectActiveSection.module.scss";
import SectionTreeMap from "../SectionTreeMap/SectionTreeMap";
import CountryDetails from "../Cards/CountryDetails/CountryDetails";
import ProjectDetails from "../Cards/ProjectDetails/ProjectDetails";
import { useSelector } from "react-redux";
import {
  IcountriesType,
  IProjectDetails,
} from "../../../../../../Interface/ModulesInterface";
import * as dayjs from "dayjs";
import * as duration from "dayjs/plugin/duration";
dayjs.extend(duration);
interface IProjectActiveSectionPros {
  countryId: number | any;
  projectId: number | any;
}

const ProjectActiveSection: React.FC<IProjectActiveSectionPros> = ({
  countryId,
  projectId,
}) => {
  console.log(countryId, projectId);

  const projectDataState: any = useSelector(
    (state: any) => state.ProjectContextSlice.projectsData
  );
  const countryDataState: any = useSelector(
    (state: any) => state.CountryContextSlice.countryData
  );

  const [activeTab, setActiveTab] = useState<any>({});
  const [countryDetails, setCountryDetails] = useState<IcountriesType>({
    ID: 0,
    countryName: "",
    Currency: "",
    ISOCode: "",
    Languages: "",
    Manager: [],
    Notes: "",
    Region: "",
    Status: "",
    ManageAccess: [],
    ManageAccessFormFormat: [],
    TimeZone: "",
  });
  const [projectDetails, setProjectDetails] = useState<IProjectDetails>({
    Id: 0,
    ProjectName: "",
    ProjectType: "",
    CountryId: 0,
    CountryName: "",
    City: "",
    Description: "",
    StartDate: "",
    EndDate: "",
    Status: "",
    ManageAccess: [],
  });
  console.log("projectDetails", projectDetails);

  useEffect(() => {
    console.log("projectDataState", projectDataState);
    projectDataState?.forEach((state: IProjectDetails) => {
      if (state?.Id === projectId) {
        setProjectDetails(state);
      }
    });
    countryDataState.forEach((state: IcountriesType) => {
      if (state?.ID === countryId) {
        setCountryDetails(state);
      }
    });
  }, []);
  return (
    <>
      <div style={{ width: "82%" }}>
        <SectionTreeMap
          CountryName={countryDetails?.countryName}
          ProjectName={projectDetails?.ProjectName}
          SectionName={activeTab?.displayName}
        />
        <div className={styles.project_Active_Section_wrapper}>
          <div style={{ width: "100%" }}>
            <ProjectNavBar setActiveTab={setActiveTab} />
            <div style={{ width: "100%", display: "flex" }}>
              <div style={{ width: "100%" }}>
                <div>
                  {activeTab?.name === "Obligations" && (
                    <Obligations
                      countryDetails={countryDetails}
                      projectDetails={projectDetails}
                    />
                  )}
                  {activeTab?.name === "Calender" && (
                    <Calender
                      countryDetails={countryDetails}
                      projectDetails={projectDetails}
                    />
                  )}
                  {activeTab?.name === "Todos" && (
                    <ToDoList
                      ProjectTitle={projectDetails?.ProjectName}
                      Taskdisabled={true}
                    />
                  )}
                  {activeTab?.name === "Documents" && (
                    <Documents
                      countryDetails={countryDetails}
                      projectDetails={projectDetails}
                    />
                  )}
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
            Id: `C00${countryDetails?.ID}`,
            Name: countryDetails?.countryName,
            projectsCount: 5,
            status: countryDetails?.Status,
          }}
        />
        <ProjectDetails
          projectDetails={{
            Id: `P000${projectDetails?.Id}`,
            Name: projectDetails?.ProjectName,
            Days:
              dayjs(projectDetails?.EndDate).diff(
                dayjs(projectDetails?.StartDate),
                "day"
              ) + 1,
            Status: projectDetails?.Status,
          }}
        />
      </div>
    </>
  );
};

export default ProjectActiveSection;
