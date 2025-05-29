/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "./Projects.module.scss";
import { Column } from "primereact/column";
import CustomDataTable from "../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import {
  OnActionsRender,
  OnDateRender,
  OnTextRender,
} from "../../../../../Utils/dataTable";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import CustomSearchInput from "../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import ProjectActiveSection from "./ProjectActiveSection/ProjectActiveSection";
import Popup from "../../Common/Popup/Popup";
import { togglePopupVisibility } from "../../../../../Utils/togglePopup";
import { IProjectDetails } from "../../../../../Interface/ModulesInterface";
import PopupSectionHeader from "../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import CustomAutoSelect from "../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";
import { onChangeFunction } from "../../../../../Utils/onChange";
import CustomInput from "../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomDropDown from "../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import ManageAccess from "../../Common/ManageAccess/ManageAccess";
import { deepClone } from "../../../../../Utils/deepClone";
import { ProjectFormDetails } from "../../../../../Config/initialStates";
import CustomDatePicker from "../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import { ProjectTypeOptions } from "../../../../../Config/dropDownOptions";
import { validateForm } from "../../../../../Utils/validations";
import {
  fetchProjectData,
  getRegisteredCountries,
  submitAddProjectForm,
  submitManageAccessForm,
} from "../../../../../Services/Projects/ProjectService";
import { useDispatch } from "react-redux";

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const cloneFormDetails = deepClone(ProjectFormDetails);
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const initialPopupController = [
    {
      open: false,
      popupTitle: "",
      popupWidth: "50%",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
    {
      open: false,
      popupTitle: "",
      popupWidth: "50%",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
  ];

  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [activeProjectTab, setActiveProjectTab] = useState("");
  const [registeredCountries, setRegisteredCountries] = useState([]);
  const [masterProjectData, setMasterProjectData] = useState<IProjectDetails[]>(
    []
  );
  const [projectData, setProjectData] = useState<IProjectDetails[]>([]);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [selectedProject, setSelectedProject] = useState<IProjectDetails>({
    Id: 0,
    ProjectName: "",
    ProjectType: "",
    CountryName: "",
    CountryId: 0,
    City: "",
    Description: "",
    StartDate: "",
    ManageAccess: [],
    EndDate: "",
  });
  console.log(
    "activeProjectTab",
    formDetails,
    activeProjectTab,
    masterProjectData,
    registeredCountries
  );

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.ProjectName?.value}
            type="text"
            placeholder="Enter project name"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("ProjectName", value, setFormDetails);
            }}
            isValid={formDetails?.ProjectName?.isValid}
            withLabel={true}
            mandatory={formDetails?.ProjectName?.isMandatory}
            labelText="Project Name"
          />
          <CustomDropDown
            options={ProjectTypeOptions}
            value={formDetails?.ProjectType?.value}
            placeholder="Select project type"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("ProjectType", value, setFormDetails);
            }}
            isValid={formDetails?.ProjectType?.isValid}
            withLabel={true}
            mandatory={formDetails?.ProjectType?.isMandatory}
            labelText="Project Type"
          />
          <CustomInput
            value={formDetails?.Description?.value}
            type="text"
            placeholder="Enter description"
            rows={3}
            sectionType="one"
            onChange={(value: string) => {
              onChangeFunction("Description", value, setFormDetails);
            }}
            isValid={formDetails?.Description?.isValid}
            withLabel={true}
            mandatory={formDetails?.Description?.isMandatory}
            labelText="Description"
          />
          <CustomAutoSelect
            value={formDetails?.Country?.value}
            options={registeredCountries.map((country: any) => ({
              Text: country.CountryName,
              ...country,
            }))}
            onChange={async (
              option: {
                Id: number;
                CountryName: string;
              } | null
            ) => {
              onChangeFunction("Country", option?.CountryName, setFormDetails);
              onChangeFunction("CountryId", option?.Id, setFormDetails);
            }}
            placeholder="Select country"
            sectionType="two"
            isValid={formDetails?.Country?.isValid}
            withLabel={true}
            mandatory={formDetails?.Country?.isMandatory}
            labelText="Country"
          />
          <CustomInput
            value={formDetails?.City?.value}
            type="text"
            placeholder="Enter city"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("City", value, setFormDetails);
            }}
            isValid={formDetails?.City?.isValid}
            withLabel={true}
            mandatory={formDetails?.City?.isMandatory}
            labelText="City"
          />
          <CustomDatePicker
            value={formDetails?.StartDate?.value}
            sectionType="two"
            placeholder="Select date"
            onChange={(value: string) => {
              onChangeFunction("StartDate", value, setFormDetails);
            }}
            isValid={formDetails?.StartDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.StartDate?.isMandatory}
            labelText="Start Date"
          />
          <CustomDatePicker
            value={formDetails?.EndDate?.value}
            minDate={formDetails?.StartDate?.value}
            sectionType="two"
            placeholder="Select date"
            onChange={(value: string) => {
              onChangeFunction("EndDate", value, setFormDetails);
            }}
            isValid={formDetails?.EndDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.EndDate?.isMandatory}
            labelText="End Date"
          />
        </div>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any) => {
            // console.log("value", value);
            onChangeFunction("ManageAccess", value, setFormDetails);
          }}
          showList="3"
          showSectionTitle={true}
        />
      </div>,
    ],
    [
      <div key={1} style={{ width: "100%" }}>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any) => {
            // console.log("value", value);
            onChangeFunction("ManageAccess", value, setFormDetails);
          }}
          showList="10"
          showSectionTitle={false}
        />
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);
    if (isFormValid) {
      console.log("Form is valid");
      submitAddProjectForm(
        formDetails,
        setMasterProjectData,
        setProjectData,
        setPopupController,
        0
      );
    }
  };

  const handleManageAccessSubmitFuction = () => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);
    if (isFormValid) {
      console.log("Form is valid");
      submitManageAccessForm(
        formDetails,
        selectedProject?.Id,
        setMasterProjectData,
        setProjectData,
        setPopupController,
        1
      );
    }
  };

  const popupActions: any[] = [
    [
      {
        text: "Cancel",
        btnType: "closeBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          setFormDetails(deepClone(cloneFormDetails));
          handleClosePopup(0);
        },
      },
      {
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleSubmitFuction();
        },
      },
    ],
    [
      {
        text: "Cancel",
        btnType: "closeBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          setFormDetails(deepClone(cloneFormDetails));
          handleClosePopup(1);
        },
      },
      {
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleManageAccessSubmitFuction();
        },
      },
    ],
  ];

  const openProjectAction = (project: any) => {
    console.log("project", project);
    setActiveProjectTab("Obligations");
    setSelectedProject(project);
  };
  const projectManageAccessAction = (project: any) => {
    setSelectedProject(project);
    console.log("project", project);
    setFormDetails({
      ManageAccess: {
        value: project?.ManageAccessFormFormat,
        isValid: true,
        isMandatory: true,
      },
    });
    togglePopupVisibility(
      setPopupController,
      1,
      "open",
      `Project Manage Access`
    );
  };

  const tableColumns = [
    [
      <DataTable
        value={projectData}
        scrollable
        scrollHeight="60vh"
        style={{ minWidth: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
      >
        <Column
          field="ProjectName"
          header="Project Name"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.ProjectName} />}
          sortable
        />
        <Column
          field="ProjectType"
          header="Project Type"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.ProjectType} />}
          sortable
        />
        <Column
          field="CountryName"
          header="Country"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.CountryName} />}
          sortable
        />
        <Column
          field="StartDate"
          header="Start Date"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnDateRender date={rowData?.StartDate} />}
          sortable
        />
        <Column
          field="EndDate"
          header="End Date"
          style={{ minWidth: "20%" }}
          body={(rowData) => <OnDateRender date={rowData?.EndDate} />}
          sortable
        />
        <Column
          field=""
          header="Actions"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnActionsRender
              openProjectAction={openProjectAction}
              userAccessAction={projectManageAccessAction}
              rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];

  useEffect(() => {
    getRegisteredCountries(setRegisteredCountries);
    fetchProjectData(setProjectData, setMasterProjectData, dispatch);
  }, []);

  return (
    <>
      {activeProjectTab === "" ? (
        <div className={styles.projects_container}>
          <div className="justify-space-between margin-right-20">
            <ModuleHeader title="Projects" />
            <div className="gap-10">
              <CustomSearchInput />
              <DefaultButton
                btnType="primaryBtn"
                text="Add new project"
                startIcon={<AddIcon />}
                onClick={() => {
                  togglePopupVisibility(
                    setPopupController,
                    0,
                    "open",
                    `Add New Project`
                  );
                  setFormDetails(deepClone(cloneFormDetails));
                  // ApproveDefinition(definitionsData, setPopupLoaders);
                }}
              />
            </div>
          </div>
          <div className={styles.projects_Wrapper}>
            <CustomDataTable table={tableColumns[0]} />
          </div>
          <div>
            {popupController?.map((popupData: any, index: number) => (
              <Popup
                key={index}
                isLoading={false}
                PopupType={popupData.popupType}
                onHide={() =>
                  togglePopupVisibility(setPopupController, index, "close")
                }
                popupTitle={
                  popupData.popupType !== "confimation" && popupData.popupTitle
                }
                popupActions={popupActions[index]}
                visibility={popupData.open}
                content={popupInputs[index]}
                popupWidth={popupData.popupWidth}
                defaultCloseBtn={popupData.defaultCloseBtn || false}
                confirmationTitle={
                  popupData.popupType !== "custom" ? popupData.popupTitle : ""
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", display: "flex" }}>
          <ProjectActiveSection
            countryId={selectedProject?.CountryId}
            projectId={selectedProject?.Id}
          />
        </div>
      )}
    </>
  );
};

export default Projects;
