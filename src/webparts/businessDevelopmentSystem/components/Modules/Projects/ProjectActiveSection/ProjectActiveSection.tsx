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
  ICountriesDetails,
  IProjectDetails,
} from "../../../../../../Interface/ModulesInterface";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
interface IProjectActiveSectionPros {
  countryId: number | any;
  projectId: number | any;
  setActiveProjectTab: React.Dispatch<React.SetStateAction<string>>;
}

const ProjectActiveSection: React.FC<IProjectActiveSectionPros> = ({
  countryId,
  projectId,
  setActiveProjectTab,
}) => {
  const projectDataState: any = useSelector(
    (state: any) => state.ProjectContextSlice.projectsData
  );
  const countryDataState: any = useSelector(
    (state: any) => state.CountryContextSlice.countryData
  );

  const [activeTab, setActiveTab] = useState<any>({});
  const [countryDetails, setCountryDetails] = useState<ICountriesDetails>({
    Id: 0,
    countryName: "",
    ProjectCount: 0,
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
    BrandingPartner: "",
    GoogleLocation: "",
    UnitSize: "",
    StartDate: "",
    EndDate: "",
    Status: "",
    ManageAccess: [],
    ManageAccessFormFormat: [],
  });

  useEffect(() => {
    projectDataState?.forEach((state: IProjectDetails) => {
      if (state?.Id === projectId) {
        setProjectDetails(state);
      }
    });
    countryDataState.forEach((state: ICountriesDetails) => {
      if (state?.Id === countryId) {
        setCountryDetails(state);
      }
    });
  }, []);

  const backToProject = () => {
    setActiveProjectTab("");
  };
  return (
    <>
      <div style={{ width: "82%" }}>
        <SectionTreeMap
          CountryName={countryDetails?.countryName}
          ProjectName={projectDetails?.ProjectName}
          SectionName={activeTab?.displayName}
          setActiveProjectTab={backToProject}
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
                    <ToDoList ProjectDetails={projectDetails} />
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
            Id: `C00${countryDetails?.Id}`,
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
