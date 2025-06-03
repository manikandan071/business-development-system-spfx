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
import { useState, useEffect } from "react";
import {
  addNewTask,
  getProjectList,
  getTasksList,
  updateTask,
} from "../../../../../../../Services/Tasks/TaskService";
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
import { Checkbox } from "primereact/checkbox";
import "./ToDoList.css"
import CustomAutoSelect from "../../../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";
interface projectOfType{
  ID:number;
  Title:string;
}
interface ToDoListProps {
  ProjectTitle: string;
  Taskdisabled: boolean;
}
const ToDoList: React.FC<ToDoListProps> = ({ ProjectTitle, Taskdisabled }) => {
  console.log("ProjectTitle",ProjectTitle);
  
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
  const cloneFormDetails = deepClone(taskFormDetails);
  const [toDoList, setToDoList] = useState<IallTasksType[]>([]);
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const [masterTasksData, setMasterTasksData] = useState<IallTasksType[]>([]);
  const [selectedRow,setSelectedRow]=useState<IallTasksType>();
  const [projectOfData,setProjectOfData]=useState<projectOfType[]>([]);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  console.log(masterTasksData,projectOfData,formDetails);
  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="BASIC DETAILS" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.TaskTitle?.value}
            type="text"
            placeholder="Enter Task Title"
            sectionType="two"
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
           <CustomAutoSelect
            value={formDetails?.ProjectOfTitle?.value}
            options={projectOfData?.map((project:any)=>({
              Text:project.Title,
              ...project
            }))}
            onChange={async (value: { Text: string; ID: number } | null) => {
              onChangeFunction("ProjectOfTitle", value?.Text, setFormDetails);
              onChangeFunction("ProjectOfID", value?.ID, setFormDetails);
              console.log("value",value)
            }}
            placeholder="Select Project"
            sectionType="two"
            isValid={formDetails?.ProjectOfTitle?.isValid}
            withLabel={true}
            disabled={Taskdisabled}
            mandatory={formDetails?.ProjectOfTitle?.isMandatory}
            labelText="Project"
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
            options={["Low", "Medium", "High"]}
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
            options={["Not Started", "In Progress", "Completed"]}
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
        <div className={styles.checkBox_Wrapper}>
          <div style={{display:"flex",gap:"8px"}}>
            <Checkbox
              inputId="sendReminder"
              checked={formDetails?.isReminder?.value}
               onChange={(e) =>
                onChangeFunction("isReminder", e.target.checked, setFormDetails)
              }
            />
            <label htmlFor="sendReminder" style={{fontSize:"14px"}}>Send Reminder</label>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <Checkbox
              inputId="isTaskOverdue"
              checked={formDetails?.isTaskOverdue?.value}
              onChange={(e) =>
                onChangeFunction(
                  "isTaskOverdue",
                  e.target.checked,
                  setFormDetails
                )
              }
            />
            <label htmlFor="isTaskOverdue" style={{fontSize:"14px"}}>Escalate if Task Overdue</label>
          </div>
        </div>
      </div>,
    ],
     [
      <div key={1} style={{ width: "100%" }}>
        <PopupSectionHeader Title="BASIC DETAILS" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.TaskTitle?.value}
            type="text"
            placeholder="Enter Task Title"
            sectionType="two"
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
          <CustomAutoSelect
            value={formDetails?.ProjectOfTitle?.value}
            options={projectOfData?.map((project:any)=>({
              Text:project.Title,
              ...project
            }))}
            onChange={async (option: { Text: string; ID: number } | null) => {
              onChangeFunction("ProjectOfTitle", option?.Text, setFormDetails);
              onChangeFunction("ProjectOfID", option?.ID, setFormDetails);
              console.log("value",option)
            }}
            placeholder="Select Project"
            sectionType="two"
            isValid={formDetails?.ProjectOfTitle?.isValid}
            withLabel={true}
            disabled={Taskdisabled}
            mandatory={formDetails?.ProjectOfTitle?.isMandatory}
            labelText="Project"
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
            options={["Low", "Medium", "High"]}
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
            options={["Not Started", "In Progress", "Completed"]}
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
        <div className={styles.checkBox_Wrapper}>
          <div style={{display:"flex",gap:"8px"}}>
            <Checkbox
              inputId="sendReminder"
              checked={formDetails?.isReminder?.value}
               onChange={(e) =>
                onChangeFunction("isReminder", e.target.checked, setFormDetails)
              }
            />
            <label htmlFor="sendReminder" style={{fontSize:"14px"}}>Send Reminder</label>
          </div>
          <div style={{display:"flex",gap:"8px"}}>
            <Checkbox
              inputId="isTaskOverdue"
              checked={formDetails?.isTaskOverdue?.value}
              onChange={(e) =>
                onChangeFunction(
                  "isTaskOverdue",
                  e.target.checked,
                  setFormDetails
                )
              }
            />
            <label htmlFor="isTaskOverdue" style={{fontSize:"14px"}}>Escalate if Task Overdue</label>
          </div>
        </div>
      </div>,
    ],
  ];
  const handleRowClick =   (rowData:any)=>{
    const taskData=rowData?.data;
    console.log("taskData",taskData)
  setSelectedRow(taskData);
  setFormDetails({
        TaskTitle: {
                value: taskData.TaskTitle,
                isValid: true,
                isMandatory: true,
              },
        Description: {
                value: taskData.Description,
                isValid: true,
                isMandatory: true,
              },
        Priority: {
                value: taskData.Priority,
                isValid: true,
                isMandatory: true,
              },
        Status: {
                value: taskData.Status,
                isValid: true,
                isMandatory: true,
              },
        StartDate:{
                value: taskData.StartDate,
                isValid: true,
                isMandatory: true,
              },
        DueDate: {
                value: taskData.DueDate,
                isValid: true,
                isMandatory: true,
              },
        selectedPeople: {
                value: taskData.AssignTo,
                isValid: true,
                isMandatory: true,
              },
        isReminder:{
                value: taskData.isReminder,
                isValid: true,
                isMandatory: false,
              },
        isTaskOverdue:{
                value: taskData.isTaskOverdue,
                isValid: true,
                isMandatory: false,
              },
          ProjectOfTitle:{
            value:taskData.ProjectOfTitle,
            isValid:true,
            isMandatory:true,
           },
           ProjectOfID:{
            value:taskData.ProjectOfID,
            isValid:true,
            isMandatory:true,
           }
      });
        togglePopupVisibility(
                      setPopupController,
                      1,
                      "open",
                      `Update Task Data`
                    );
  }
  const handleSubmitFuction = async (): Promise<void> => {
    console.log("FormDetails",formDetails)
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);

    if (isFormValid) {
      console.log("Form is valid");
      addNewTask(formDetails, setToDoList);
      togglePopupVisibility(setPopupController, 0, "close");
    }
  };
  const handleUpdateFuction = async (): Promise<void>=>{
    console.log("formDeatails",formDetails);
    const isFormValid = validateForm(formDetails, setFormDetails);
     console.log("isFormValid", isFormValid);
    if (isFormValid) {
      console.log("Form is valid");
      updateTask(
        formDetails,
        selectedRow?.ID,
        setMasterTasksData,
        setToDoList,
        setPopupController,
        1
      );
    }
  }
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
        text: "Update",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleUpdateFuction();
        },
      },
    ],
  ];
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
        onRowClick={handleRowClick}
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
  useEffect(() => {
    getProjectList(setProjectOfData);
    getTasksList(setToDoList, setMasterTasksData);
  }, []);

  const setInitialState =()=>{
    if(ProjectTitle){
      setFormDetails({
        TaskTitle: {
                value: "",
                isValid: true,
                isMandatory: true,
              },
        Description: {
                value: "",
                isValid: true,
                isMandatory: true,
              },
        Priority: {
                value: "",
                isValid: true,
                isMandatory: true,
              },
        Status: {
                value: "",
                isValid: true,
                isMandatory: true,
              },
        StartDate:{
                value: "",
                isValid: true,
                isMandatory: true,
              },
        DueDate: {
                value: "",
                isValid: true,
                isMandatory: true,
              },
        selectedPeople: {
                value: [],
                isValid: true,
                isMandatory: true,
              },
        isReminder:{
                value: "",
                isValid: true,
                isMandatory: false,
              },
        isTaskOverdue:{
                value: "",
                isValid: true,
                isMandatory: false,
              },
          ProjectOfTitle:{
          value:ProjectTitle,
          isValid:true,
          isMandatory:true,
        },
           ProjectOfID:{
            value:"",
            isValid:true,
            isMandatory:true,
           },
       
      })
    }else{
      setFormDetails(deepClone(cloneFormDetails));
    }
  }
  return (
    <div className={styles.TodoList_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new to-do"
          startIcon={<AddIcon />}
          onClick={() => {
            // setFormDetails(deepClone(cloneFormDetails));
             setInitialState()
            togglePopupVisibility(
              setPopupController,
              0,
              "open",
              `Add New Task`
            );
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
