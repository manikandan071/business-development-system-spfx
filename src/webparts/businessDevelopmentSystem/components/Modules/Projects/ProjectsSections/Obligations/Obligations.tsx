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
  OnDateRender,
  OnStatusRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import { useEffect, useState } from "react";
import { IObligationDetails } from "../../../../../../../Interface/ModulesInterface";
import { togglePopupVisibility } from "../../../../../../../Utils/togglePopup";
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
  PriorityTypeOptions,
} from "../../../../../../../Config/dropDownOptions";
import CustomDatePicker from "../../../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import { validateForm } from "../../../../../../../Utils/validations";
import {
  detchOblicationData,
  submitObligationForm,
} from "../../../../../../../Services/Obligation/ObligationService";

const Obligations: React.FC = () => {
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
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [masterOblicationData, setMasterOblicationData] = useState<
    IObligationDetails[]
  >([]);
  const [oblicationData, setOblicationData] = useState<IObligationDetails[]>(
    []
  );
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));

  console.log(masterOblicationData, oblicationData);

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
            placeholder="Select obligation type"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("ObligationType", value, setFormDetails);
            }}
            isValid={formDetails?.ObligationType?.isValid}
            withLabel={true}
            mandatory={formDetails?.ObligationType?.isMandatory}
            labelText="Obligation Type"
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
          <CustomInput
            value={formDetails?.Party?.value}
            type="text"
            placeholder="Enter Party"
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
            placeholder="Enter Clause"
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
            options={PriorityTypeOptions}
            value={formDetails?.Priority?.value}
            placeholder="Select priority"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Priority", value, setFormDetails);
            }}
            isValid={formDetails?.Priority?.isValid}
            withLabel={true}
            mandatory={formDetails?.Priority?.isMandatory}
            labelText="Priority"
          />
          <CustomDropDown
            options={ObligationStatusOptions}
            value={formDetails?.Status?.value}
            placeholder="Select Status"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Status", value, setFormDetails);
            }}
            isValid={formDetails?.Status?.isValid}
            withLabel={true}
            mandatory={formDetails?.Status?.isMandatory}
            labelText="Status"
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
          />
        </div>
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);
    if (isFormValid) {
      console.log("Form is valid");
      submitObligationForm(
        formDetails,
        setMasterOblicationData,
        setOblicationData,
        setPopupController,
        0
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
  ];

  const tableColumns = [
    [
      <DataTable
        value={oblicationData}
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
          field="Title"
          header="Title"
          style={{ width: "20%" }}
          body={(rowData) => <OnTextRender text={rowData?.Title} />}
          sortable
        />
        <Column
          field="ObligationType"
          header="Obligation Type"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.ObligationType} />}
          sortable
        />
        <Column
          field="Party"
          header="Party"
          style={{ width: "15%" }}
          body={(rowData) => <OnTextRender text={rowData?.Party} />}
          sortable
        />
        <Column
          field="Priority"
          header="Priority"
          style={{ width: "10%" }}
          body={(rowData) => <OnTextRender text={rowData?.Priority} />}
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
          header="Start Date"
          style={{ width: "15%" }}
          body={(rowData) => <OnDateRender date={rowData?.StartDate} />}
          sortable
        />
        <Column
          field="DueDate"
          header="Due Date"
          style={{ width: "10%" }}
          body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
          sortable
        />
        {/* <Column
            field=""
            header="Actions"
            style={{ minWidth: "20%" }}
            body={(rowData) => (
              <OnActionsRender setActiveProjectTab={setActiveProjectTab} />
            )}
          /> */}
      </DataTable>,
    ],
  ];

  useEffect(() => {
    detchOblicationData(setMasterOblicationData, setOblicationData);
  }, []);

  return (
    <div className={styles.Obligations_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new contractual obligations"
          startIcon={<AddIcon />}
          onClick={() => {
            togglePopupVisibility(
              setPopupController,
              0,
              "open",
              `Add New Contractual Obligations`
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
  );
};

export default Obligations;
