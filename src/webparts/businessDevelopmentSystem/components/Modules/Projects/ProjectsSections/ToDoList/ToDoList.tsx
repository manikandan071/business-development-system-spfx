/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import styles from "./ToDoList.module.scss";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSearchInput from "../../../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnDateRender,
  OnManagerRender,
  OnStatusRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import { useState,useEffect } from "react";
import { addNewTask, getTasksList } from "../../../../../../../Services/Tasks/TaskService";
import { IallTasksType } from "../../../../../../../Interface/ModulesInterface";
import { togglePopupVisibility } from "../../../../../../../Utils/togglePopup";
import { taskFormDetails } from "../../../../../../../Config/initialStates";
import { deepClone } from "../../../../../../../Utils/deepClone";
import { onChangeFunction } from "../../../../../../../Utils/onChange";
import PopupSectionHeader from "../../../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import CustomInput from "../../../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomDropDown from "../../../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import CustomDatePicker from "../../../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import CustomPeoplePicker from "../../../../Common/CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import { validateForm } from "../../../../../../../Utils/validations";
import Popup from "../../../../Common/Popup/Popup";

const ToDoList: React.FC = () => {
  const initialPopupController = [
    {
      open: false,
      popupTitle: "",
      popupWidth: "900px",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    }]
  const cloneFormDetails = deepClone(taskFormDetails);
  const [toDoList,setToDoList]= useState<IallTasksType[]>([]);
   const handleClosePopup = (index?: any): void => {
      togglePopupVisibility(setPopupController, index, "close");
    };
    const [masterTasksData,setMasterTasksData] =useState<IallTasksType[]>([]);
    const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
    const [popupController, setPopupController] = useState(
        initialPopupController
      );
    console.log(masterTasksData);
    const popupInputs: any[] = [
        [
          <div key={0} style={{ width: "100%" }}>
            <PopupSectionHeader Title="BASIC DETAILS" />
            <div className="section-wrapper">
              <CustomInput
                value={formDetails?.TaskTitle?.value}
                type="text"
                placeholder="Enter Task Title"
                sectionType="one"
                onChange={(value: string) => {
                  onChangeFunction("TaskTitle", value, setFormDetails);
                }}
                isValid={formDetails?.TaskTitle?.isValid}
                withLabel={true}
                mandatory={formDetails?.TaskTitle?.isMandatory}
                labelText="Title"
                readOnly={false}
                disabled={false}
              />
              <CustomInput
                value={formDetails?.Description?.value}
                type="text"
                 rows={3}
                placeholder="Enter Description"
                sectionType="one"
                onChange={(value: string) => {
                  onChangeFunction("Description", value, setFormDetails);
                }}
                isValid={formDetails?.Description?.isValid}
                withLabel={true}
                mandatory={formDetails?.Description?.isMandatory}
                labelText="Description"
                disabled={false}
              />
              <CustomDropDown
                options={["Low","Medium","High"]}
                value={formDetails?.Priority?.value}
                placeholder="Select Priority"
                sectionType="two"
                onChange={(value: string) => {
                  onChangeFunction("Priority", value, setFormDetails);
                }}
                isValid={formDetails?.Priority?.isValid}
                withLabel={true}
                mandatory={formDetails?.Priority?.isMandatory}
                labelText="Priority"
                disabled={false}
                readOnly={false}
              />
              <CustomDropDown
                options={["Not Started","In Progress","Completed"]}
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
                disabled={false}
                readOnly={false}
              />
              <CustomDatePicker
                value={formDetails?.StartDate?.value}
                placeholder="Enter StartDate"
                sectionType="two"
                onChange={(value: string) => {
                  onChangeFunction("StartDate", value, setFormDetails);
                }}
                isValid={formDetails?.StartDate?.isValid}
                withLabel={true}
                mandatory={formDetails?.StartDate?.isMandatory}
                labelText="StartDate"
                disabled={false}
                readOnly={false}
              />
               <CustomDatePicker
                value={formDetails?.DueDate?.value}
                placeholder="Enter DueDate"
                sectionType="two"
                onChange={(value: string) => {
                  onChangeFunction("DueDate", value, setFormDetails);
                }}
                isValid={formDetails?.DueDate?.isValid}
                withLabel={true}
                mandatory={formDetails?.DueDate?.isMandatory}
                labelText="DueDate"
                disabled={false}
                readOnly={false}
              />
            </div>
            <div>
              <PopupSectionHeader Title="PEOPLE & OTHERS" />
              <div className="section-wrapper">
                <CustomPeoplePicker
                  selectedItem={formDetails?.selectedPeople?.value}
                  sectionType="one"
                  personSelectionLimit={1}
                  minHeight="38px"
                  maxHeight="38px"
                  onChange={(value: any[]) => {
                    onChangeFunction("selectedPeople", value, setFormDetails);
                  }}
                  isValid={formDetails?.selectedPeople?.isValid}
                  withLabel={true}
                  mandatory={formDetails?.selectedPeople?.isMandatory}
                  labelText="Manager"
                />
              </div>
            </div>
          </div>,
        ],
      ];
      const handleSubmitFuction = async (): Promise<void> => {
        const isFormValid = validateForm(
          formDetails,
          setFormDetails,
        );
        console.log("isFormValid", isFormValid);
      
        if (isFormValid) {
          console.log("Form is valid");
           addNewTask(formDetails,setToDoList)
          togglePopupVisibility(setPopupController, 0, "close");
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
          ]
        ]
  const tableColumns = [
    [
      <DataTable
        value={toDoList}
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
          field="TaskTitle"
          header="Task Name"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.TaskTitle} />}
          sortable
        />
        <Column
          field="Priority"
          header="Priority"
          style={{ minWidth: "25%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Priority} />}
          sortable
        />
        <Column
          field="AssignTo"
          header="Assigned To"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnManagerRender rowData={rowData?.AssignTo} />}
          sortable
        />
         <Column
          field="Status"
          header="Status"
          style={{ minWidth: "25%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Status} />}
          sortable
        /> 
        <Column
          field="StartDate"
          header="StartDate"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnDateRender text={rowData?.StartDate} />}
          sortable
        />
        <Column
          field="DueDate"
          header="DueDate"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnDateRender text={rowData?.DueDate} />}
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
useEffect(()=>{
  getTasksList(setToDoList,setMasterTasksData)
},[])
  return (
    <div className={styles.TodoList_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new to-do"
          startIcon={<AddIcon />}
           onClick={() => {
            togglePopupVisibility(
              setPopupController,
              0,
              "open",
              `Add New Task`
            );
            setFormDetails(deepClone(cloneFormDetails));
          }}
        />
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
      <div className={styles.TodoList_main}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default ToDoList;
