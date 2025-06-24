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
  OnStatusRender,
  OnTextRender,
} from "../../../../../Utils/dataTable";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import CustomSearchInput from "../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import ProjectActiveSection from "./ProjectActiveSection/ProjectActiveSection";
import Popup from "../../Common/Popup/Popup";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../Utils/togglePopup";
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
import {
  ProjectStatusOptions,
  ProjectTypeOptions,
} from "../../../../../Config/dropDownOptions";
import { validateForm } from "../../../../../Utils/validations";
import {
  fetchProjectData,
  getRegisteredCountries,
  submitAddProjectForm,
  updateProjectForm,
} from "../../../../../Services/Projects/ProjectService";
import { useDispatch, useSelector } from "react-redux";
import { submitManageAccessForm } from "../../../../../Services/CommonService/CommonService";
import { SPLists } from "../../../../../Config/config";
import AppLoader from "../../Common/AppLoader/AppLoader";

interface IProjectProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: any;
}

const Projects: React.FC<IProjectProps> = ({
  setActiveTab,
  selectedCountry,
}) => {
  const dispatch = useDispatch();
  const cloneFormDetails = deepClone(ProjectFormDetails);
  const currentUserDetails = useSelector(
    (state: any) => state?.MainSPContext?.currentUserDetails
  );
  console.log("currentUserDetails", currentUserDetails);

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

  const initialPopupResponse = [
    {
      Loading: false,
      Title: "",
      Message: "",
    },
    {
      Loading: false,
      Title: "",
      Message: "",
    },
  ];

  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [popupResponse, setPopupResponse] = useState(initialPopupResponse);
  const [activeProjectTab, setActiveProjectTab] = useState("");
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [registeredCountries, setRegisteredCountries] = useState([]);
  const [masterProjectData, setMasterProjectData] = useState<IProjectDetails[]>(
    []
  );
  const [projectData, setProjectData] = useState<IProjectDetails[]>([]);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "New",
  });
  const [selectedProject, setSelectedProject] = useState<IProjectDetails>({
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
  });
  console.log("registeredCountries", registeredCountries);
  console.log("formDetails", formDetails);
  console.log("formDetails", formDetails?.Country?.value ? true : false);

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
            labelText="Project name"
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
            labelText="Project type"
          />
          {/* <CustomInput
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
            /> */}
          <CustomAutoSelect
            value={formDetails?.Country?.value || ""}
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
              onChangeFunction(
                "ManageAccess",
                (option as any)?.ManageAccessFormFormat || [],
                setFormDetails
              );
            }}
            placeholder="Select country"
            sectionType="two"
            isValid={formDetails?.Country?.isValid}
            withLabel={true}
            readOnly={
              isUpdateDetails?.Type === "Update" ||
              (selectedCountry && Object.keys(selectedCountry).length > 0)
            }
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
          <CustomInput
            value={formDetails?.GoogleLocation?.value}
            type="text"
            placeholder="Enter google location"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("GoogleLocation", value, setFormDetails);
            }}
            isValid={formDetails?.GoogleLocation?.isValid}
            withLabel={true}
            mandatory={formDetails?.GoogleLocation?.isMandatory}
            labelText="Google location"
          />
          <CustomInput
            value={formDetails?.BrandingPartner?.value}
            type="text"
            placeholder="Enter branding partner"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("BrandingPartner", value, setFormDetails);
            }}
            isValid={formDetails?.BrandingPartner?.isValid}
            withLabel={true}
            mandatory={formDetails?.BrandingPartner?.isMandatory}
            labelText="Branding partner"
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
            labelText="Sales launch date"
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
            labelText="Sales to date"
          />
          <CustomInput
            value={formDetails?.UnitSize?.value}
            type="text"
            placeholder="Enter unit mix & size"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("UnitSize", value, setFormDetails);
            }}
            isValid={formDetails?.UnitSize?.isValid}
            withLabel={true}
            mandatory={formDetails?.UnitSize?.isMandatory}
            labelText="Unit mix & size"
          />
          <CustomDropDown
            options={ProjectStatusOptions}
            value={formDetails?.Status?.value}
            placeholder="Select Status"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Status", value, setFormDetails);
            }}
            isValid={formDetails?.Status?.isValid}
            withLabel={true}
            readOnly={isUpdateDetails?.Type === "New" ? true : false}
            mandatory={formDetails?.Status?.isMandatory}
            labelText="Status"
          />
        </div>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any, isBreakeCondition?: boolean) => {
            console.log("ManageAccess value", value);
            console.log("isBreakeCondition", isBreakeCondition);

            if (isBreakeCondition) {
              onChangeFunction("BreakPermission", value, setFormDetails);
            } else {
              onChangeFunction("ManageAccess", value, setFormDetails);
            }
          }}
          showList="3"
          showSectionTitle={true}
          breakCondition={formDetails?.BreakPermission?.value}
          ifShowManageAccess={
            formDetails?.Country?.value !== undefined ? true : false
          }
        />
      </div>,
    ],
    [
      <div key={1} style={{ width: "100%" }}>
        <ManageAccess
          ManageAccess={formDetails?.ManageAccess?.value}
          onChange={(value: any, isBreakeCondition?: boolean) => {
            console.log("ManageAccess value", value);
            console.log("isBreakeCondition", isBreakeCondition);
            if (isBreakeCondition) {
              onChangeFunction("BreakPermission", value, setFormDetails);
            } else {
              onChangeFunction("ManageAccess", value, setFormDetails);
            }
          }}
          showList="10"
          showSectionTitle={false}
          breakCondition={formDetails?.BreakPermission?.value}
          ifShowManageAccess={true}
        />
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    const parentManageAccess = (registeredCountries as any[])?.filter(
      (country: any) => {
        return country.CountryName === formDetails?.Country?.value;
      }
    )[0]?.ManageAccess;
    console.log("parentManageAccess", parentManageAccess);
    const parentManageAccessEmails = parentManageAccess.map((user: any) =>
      user.Email.toLowerCase()
    );

    const secondaryMAUsers: any[] = [];

    formDetails?.ManageAccess?.value?.forEach((entry: any) => {
      entry.User.value.forEach((user: any) => {
        const email = user.email?.toLowerCase();
        const isAlreadyInMaster = parentManageAccessEmails.includes(email);
        if (email && !isAlreadyInMaster) {
          secondaryMAUsers.push(user);
        }
      });
    });

    console.log(secondaryMAUsers);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (isUpdateDetails?.Type === "New") {
        submitAddProjectForm(
          formDetails,
          secondaryMAUsers,
          setMasterProjectData,
          setProjectData,
          setPopupResponse,
          0,
          dispatch
        );
      } else {
        updateProjectForm(
          formDetails,
          secondaryMAUsers,
          isUpdateDetails,
          setMasterProjectData,
          setProjectData,
          setPopupResponse,
          0,
          dispatch
        );
      }
    }
  };

  const handleManageAccessSubmitFuction = () => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 1, true, "", "");
      submitManageAccessForm(
        formDetails,
        selectedProject?.Id,
        SPLists.Projectslist,
        setMasterProjectData,
        setProjectData,
        setPopupResponse,
        1,
        SPLists.Countrieslist,
        selectedProject?.CountryId
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
        text: isUpdateDetails?.Type === "New" ? "Submit" : "Update",
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
    setActiveProjectTab("Obligations");
    setSelectedProject(project);
  };

  const projectManageAccessAction = (project: any) => {
    setSelectedProject(project);
    setFormDetails({
      BreakPermission: {
        value: project?.BreakPermission || false,
        isValid: true,
        isMandatory: false,
      },
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

  const setEditForm = (projectDetails: IProjectDetails) => {
    setFormDetails({
      ProjectName: {
        value: projectDetails?.ProjectName,
        isValid: true,
        isMandatory: true,
      },
      Description: {
        value: projectDetails?.Description,
        isValid: true,
        isMandatory: false,
      },
      ProjectType: {
        value: projectDetails?.ProjectType,
        isValid: true,
        isMandatory: true,
      },
      Country: {
        value: projectDetails?.CountryName,
        isValid: true,
        isMandatory: true,
      },
      CountryId: {
        value: projectDetails?.CountryId,
        isValid: true,
        isMandatory: true,
      },
      City: {
        value: projectDetails?.City,
        isValid: true,
        isMandatory: true,
      },
      GoogleLocation: {
        value: projectDetails?.GoogleLocation,
        isValid: true,
        isMandatory: true,
      },
      BrandingPartner: {
        value: projectDetails?.BrandingPartner,
        isValid: true,
        isMandatory: true,
      },
      StartDate: {
        value: projectDetails?.StartDate,
        isValid: true,
        isMandatory: true,
      },
      EndDate: {
        value: projectDetails?.EndDate,
        isValid: true,
        isMandatory: true,
      },
      Status: {
        value: projectDetails?.Status,
        isValid: true,
        isMandatory: true,
      },
      UnitSize: {
        value: projectDetails?.UnitSize,
        isValid: true,
        isMandatory: false,
      },
      BreakPermission: {
        value: projectDetails?.BreakPermission || false,
        isValid: true,
        isMandatory: false,
      },
      ManageAccess: {
        value: projectDetails?.ManageAccessFormFormat,
        isValid: true,
      },
    });
    setIsUpdateDetails({
      Id: projectDetails?.Id,
      Type: "Update",
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Project`);
  };

  const tableColumns = [
    [
      <DataTable
        value={projectData}
        className="min_height_60vh"
        scrollable
        scrollHeight="60vh"
        style={{ width: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
          projectData?.length === 1 ? "record" : "records"
        }`}
        emptyMessage="No data found."
      >
        <Column
          field="ProjectName"
          header="Project name"
          style={{ width: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.ProjectName} />}
          sortable
        />
        <Column
          field="ProjectType"
          header="Project type"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.ProjectType} />}
          sortable
        />
        <Column
          field="CountryName"
          header="Country"
          style={{ width: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.CountryName} />}
          sortable
        />
        <Column
          field="BrandingPartner"
          header="Branding partner"
          style={{ width: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.BrandingPartner} />}
          sortable
        />
        {/* <Column
          field="StartDate"
          header="Start Date"
          style={{ width: "15%" }}
          body={(rowData) => <OnDateRender date={rowData?.StartDate} />}
          sortable
        /> */}
        <Column
          field="EndDate"
          header="Sales to date"
          style={{ width: "15%" }}
          body={(rowData) => <OnDateRender date={rowData?.EndDate} />}
          sortable
        />
        <Column
          field="Status"
          header="Status"
          style={{ width: "10%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Status} />}
          sortable
        />
        <Column
          field=""
          header="Actions"
          style={{ width: "10%" }}
          body={(rowData) => (
            <OnActionsRender
              editAction={setEditForm}
              userAccessAction={projectManageAccessAction}
              launchAction={openProjectAction}
              isShowEdit={rowData?.isManageAccessPermission}
              isShowUserAccess={rowData?.isManageAccessPermission}
              rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];

  useEffect(() => {
    getRegisteredCountries(setRegisteredCountries);
    fetchProjectData(
      currentUserDetails[0].isAdmin,
      selectedCountry?.Id,
      setProjectData,
      setMasterProjectData,
      dispatch,
      setIsLoader
    );
  }, []);

  const backToCountries = () => {
    setActiveTab("Countries");
  };

  const searchFilterFunctionality = (value: string) => {
    const filteredOptions = masterProjectData.filter(
      (item) =>
        item.ProjectName.toLowerCase().includes(value.toLowerCase()) ||
        item.ProjectType.toLowerCase().includes(value.toLowerCase()) ||
        item.BrandingPartner.toLowerCase().includes(value.toLowerCase()) ||
        item.CountryName.toLowerCase().includes(value.toLowerCase()) ||
        item.Status.toLowerCase().includes(value.toLowerCase())
    );
    setProjectData(filteredOptions);
  };

  return (
    <>
      {activeProjectTab === "" ? (
        isLoader ? (
          <AppLoader />
        ) : (
          <div className={styles.projects_container}>
            <div className="justify-space-between margin-left-right-20">
              <ModuleHeader
                title="Projects"
                selectedCountry={selectedCountry}
                backToCountries={backToCountries}
              />
              <div className="gap-10">
                <CustomSearchInput searchFunction={searchFilterFunctionality} />
                <DefaultButton
                  btnType="primaryBtn"
                  text="Add Project"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setIsUpdateDetails({
                      Id: null,
                      Type: "New",
                    });
                    togglePopupVisibility(
                      setPopupController,
                      0,
                      "open",
                      `Add Project`
                    );
                    const newFormTemp = deepClone(cloneFormDetails);
                    setFormDetails({
                      ...newFormTemp,
                      Country: {
                        value: selectedCountry?.countryName,
                        isValid: true,
                        isMandatory: true,
                      },
                      CountryId: {
                        value: selectedCountry?.Id,
                        isValid: true,
                        isMandatory: true,
                      },
                      ManageAccess: {
                        value: selectedCountry?.ManageAccessFormFormat,
                        isValid: true,
                      },
                    });
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
                  onHide={() => {
                    togglePopupVisibility(setPopupController, index, "close");
                    setPopupResponseFun(setPopupResponse, index, false, "", "");
                  }}
                  popupTitle={
                    popupData.popupType !== "confimation" &&
                    popupData.popupTitle
                  }
                  popupActions={popupActions[index]}
                  visibility={popupData.open}
                  content={popupInputs[index]}
                  response={popupResponse[index]}
                  popupWidth={popupData.popupWidth}
                  defaultCloseBtn={popupData.defaultCloseBtn || false}
                  confirmationTitle={
                    popupData.popupType !== "custom" ? popupData.popupTitle : ""
                  }
                />
              ))}
            </div>
          </div>
        )
      ) : (
        <div style={{ width: "100%", display: "flex" }}>
          <ProjectActiveSection
            countryId={selectedProject?.CountryId}
            projectId={selectedProject?.Id}
            setActiveProjectTab={setActiveProjectTab}
          />
        </div>
      )}
    </>
  );
};

export default Projects;
