/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import styles from "./Obligations.module.scss";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSearchInput from "../../../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnDateAndTimeRender,
  OnStatusRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import { useEffect, useState } from "react";
import {
  ICountriesDetails,
  IObligationDetails,
  IProjectDetails,
} from "../../../../../../../Interface/ModulesInterface";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../../../Utils/togglePopup";
import Popup from "../../../../Common/Popup/Popup";
import PopupSectionHeader from "../../../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import CustomInput from "../../../../Common/CustomInputFields/CustomInput/CustomInput";
import { onChangeFunction } from "../../../../../../../Utils/onChange";
import { ObligationFormDetails } from "../../../../../../../Config/initialStates";
import { deepClone } from "../../../../../../../Utils/deepClone";
import CustomDropDown from "../../../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import {
  ObligationStatusOptions,
  ObligationTypeOptions,
  // PriorityTypeOptions,
  ResponsibleOptions,
} from "../../../../../../../Config/dropDownOptions";
import { validateForm } from "../../../../../../../Utils/validations";
import {
  fetchOblicationData,
  submitObligationForm,
  updateObligationForm,
} from "../../../../../../../Services/Obligation/ObligationService";
import AppLoader from "../../../../Common/AppLoader/AppLoader";
import CustomDateTimePicker from "../../../../Common/CustomInputFields/CustomDateTimePicker/CustomDateTimePicker";

interface IObligationsProps {
  countryDetails: ICountriesDetails;
  projectDetails: IProjectDetails;
}

const Obligations: React.FC<IObligationsProps> = ({
  countryDetails,
  projectDetails,
}) => {
  const cloneFormDetails = deepClone(ObligationFormDetails);
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
  ];
  const initialPopupResponse = [
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
  const [masterOblicationData, setMasterOblicationData] = useState<
    IObligationDetails[]
  >([]);
  const [oblicationData, setOblicationData] = useState<IObligationDetails[]>(
    []
  );
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "",
  });
  const [isLoader, setIsLoader] = useState<boolean>(true);

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.Title?.value}
            type="text"
            placeholder="Enter title"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Title", value, setFormDetails);
            }}
            isValid={formDetails?.Title?.isValid}
            withLabel={true}
            mandatory={formDetails?.Title?.isMandatory}
            labelText="Title"
          />
          <CustomDropDown
            options={ObligationTypeOptions}
            value={formDetails?.ObligationType?.value}
            placeholder="Select contract type"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("ObligationType", value, setFormDetails);
            }}
            isValid={formDetails?.ObligationType?.isValid}
            withLabel={true}
            mandatory={formDetails?.ObligationType?.isMandatory}
            labelText="Contract type"
          />
          <CustomInput
            value={formDetails?.Description?.value}
            type="text"
            placeholder="Enter description of contractual obligation"
            rows={3}
            sectionType="one"
            onChange={(value: string) => {
              onChangeFunction("Description", value, setFormDetails);
            }}
            isValid={formDetails?.Description?.isValid}
            withLabel={true}
            mandatory={formDetails?.Description?.isMandatory}
            labelText="Description of contractual obligation"
          />
          <CustomInput
            value={formDetails?.Party?.value}
            type="text"
            placeholder="Enter party"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Party", value, setFormDetails);
            }}
            isValid={formDetails?.Party?.isValid}
            withLabel={true}
            mandatory={formDetails?.Party?.isMandatory}
            labelText="Party"
          />
          <CustomInput
            value={formDetails?.Clause?.value}
            type="text"
            placeholder="Enter clause"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Clause", value, setFormDetails);
            }}
            isValid={formDetails?.Clause?.isValid}
            withLabel={true}
            mandatory={formDetails?.Clause?.isMandatory}
            labelText="Clause"
          />
          <CustomDropDown
            options={ResponsibleOptions}
            value={formDetails?.Priority?.value}
            placeholder="Select party responsible"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Priority", value, setFormDetails);
            }}
            isValid={formDetails?.Priority?.isValid}
            withLabel={true}
            mandatory={formDetails?.Priority?.isMandatory}
            labelText="Party responsible"
          />
          <CustomDropDown
            options={ObligationStatusOptions}
            value={formDetails?.Status?.value}
            placeholder="Select status"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Status", value, setFormDetails);
            }}
            isValid={formDetails?.Status?.isValid}
            withLabel={true}
            readOnly={isUpdateDetails?.Type ==="New"?true:false}
            mandatory={formDetails?.Status?.isMandatory}
            labelText="Status"
          />
          <CustomDateTimePicker
            value={formDetails?.StartDate?.value}
            sectionType="two"
            placeholder="Select date/time"
            onChange={(value: string) => {
              onChangeFunction("StartDate", value, setFormDetails);
            }}
            isValid={formDetails?.StartDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.StartDate?.isMandatory}
            labelText="Associated date/time"
          />
          {/* <CustomDatePicker
            value={formDetails?.StartDate?.value}
            sectionType="two"
            placeholder="Select date/time"
            onChange={(value: string) => {
              onChangeFunction("StartDate", value, setFormDetails);
            }}
            isValid={formDetails?.StartDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.StartDate?.isMandatory}
            labelText="Associated date/time"
          /> */}
          {/* <CustomDatePicker
            value={formDetails?.DueDate?.value}
            minDate={formDetails?.StartDate?.value}
            sectionType="two"
            placeholder="Select date"
            onChange={(value: string) => {
              onChangeFunction("DueDate", value, setFormDetails);
            }}
            isValid={formDetails?.DueDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.DueDate?.isMandatory}
            labelText="Start Date"
          /> */}
        </div>
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (isUpdateDetails?.Type === "New") {
        submitObligationForm(
          formDetails,
          setMasterOblicationData,
          setOblicationData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      } else {
        debugger;
        updateObligationForm(
          formDetails,
          isUpdateDetails,
          setMasterOblicationData,
          setOblicationData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      }
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
          setPopupResponseFun(setPopupResponse, 0, false, "", "");
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
  ];

  const setEditForm = (obligationDetails: IObligationDetails) => {
    setFormDetails({
      Title: {
        value: obligationDetails?.Title,
        isValid: true,
        isMandatory: true,
      },
      Description: {
        value: obligationDetails?.Description,
        isValid: true,
        isMandatory: false,
      },
      ObligationType: {
        value: obligationDetails?.ObligationType,
        isValid: true,
        isMandatory: true,
      },
      Priority: {
        value: obligationDetails?.Priority,
        isValid: true,
        isMandatory: true,
      },
      Status: {
        value: obligationDetails?.Status,
        isValid: true,
        isMandatory: true,
      },
      Party: {
        value: obligationDetails?.Party,
        isValid: true,
        isMandatory: true,
      },
      Clause: {
        value: obligationDetails?.Clause,
        isValid: true,
        isMandatory: true,
      },
      StartDate: {
        value: obligationDetails?.StartDate,
        isValid: true,
        isMandatory: true,
      },
      DueDate: {
        value: obligationDetails?.DueDate,
        isValid: true,
        isMandatory: false,
      },
      Remarks: {
        value: obligationDetails?.Remarks,
        isValid: true,
        isMandatory: false,
      },
    });
    setIsUpdateDetails({
      Id: obligationDetails?.Id,
      Type: "Update",
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Obligation`);
  };

  const tableColumns = [
    [
      <DataTable
        value={oblicationData}
        className="min_height_48vh"
        scrollable
        scrollHeight="48vh"
        style={{ minWidth: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
          oblicationData?.length === 1 ? "record" : "records"
        }`}
        emptyMessage="No data found."
      >
        <Column
          field="Title"
          header="Title"
          style={{ width: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.Title} />}
          sortable
        />
        <Column
          field="ObligationType"
          header="Contract type"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.ObligationType} />}
          sortable
        />
        <Column
          field="Party"
          header="Party"
          style={{ width: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.Party} />}
        />
        <Column
          field="Clause"
          header="Clause"
          style={{ width: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.Clause} />}
          sortable
        />
        <Column
          field="Status"
          header="Status"
          style={{ width: "15%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Status} />}
          sortable
        />
        <Column
          field="StartDate"
          header="Associated date/time"
          style={{ width: "20%" }}
          body={(rowData) => <OnDateAndTimeRender date={rowData?.StartDate} />}
          sortable
        />
        {/* <Column
          field="DueDate"
          header="Due Date"
          style={{ width: "10%" }}
          body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
          sortable
        /> */}
        <Column
          field=""
          header="Actions"
          style={{ minWidth: "10%" }}
          body={(rowData) => (
            <OnActionsRender
              editAction={setEditForm}
              isShowLunch={false}
              isShowUserAccess={false}
              rowData={rowData}
            />
          )}
        />
      </DataTable>,
    ],
  ];

  useEffect(() => {
    fetchOblicationData(
      setMasterOblicationData,
      setOblicationData,
      projectDetails?.Id,
      setIsLoader
    );
  }, []);

  const searchFilterFunctionality = (value: string) => {
    const filteredOptions = masterOblicationData.filter(
      (item) =>
        item.Title.toLowerCase().includes(value.toLowerCase()) ||
        item.ObligationType.toLowerCase().includes(value.toLowerCase()) ||
        item.Party.toLowerCase().includes(value.toLowerCase()) ||
        item.Clause.toLowerCase().includes(value.toLowerCase())
    );
    setOblicationData(filteredOptions);
  };

  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.Obligations_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput searchFunction={searchFilterFunctionality} />
        <DefaultButton
          btnType="primaryBtn"
          text="Add Contractual Obligation"
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
              `Add Contractual Obligations`
            );
            setFormDetails(deepClone(cloneFormDetails));
          }}
        />
      </div>
      <div className={styles.Obligations_main}>
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
              popupData.popupType !== "confimation" && popupData.popupTitle
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
  );
};

export default Obligations;
