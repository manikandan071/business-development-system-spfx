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
// import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnDateRender,
  OnStatusRender,
  OnTextRender,
  OnUsersRender,
} from "../../../../../../../Utils/dataTable";
import { useState, useEffect } from "react";
import {
  getProjectList,
  fetchProjectTasks,
  submitProjectTaskForm,
  updateProjectTaskForm,
  // getSubtasksData,
  submitSubTaskForm,
  updateSubTaskForm,
} from "../../../../../../../Services/Tasks/TaskService";
import {
  IProjectTaskDeatils,
  IProjectDetails,
} from "../../../../../../../Interface/ModulesInterface";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../../../Utils/togglePopup";
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
import "./ToDoList.css";
import CustomAutoSelect from "../../../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";
import AppLoader from "../../../../Common/AppLoader/AppLoader";
import CustomAccordion from "../../../../Common/Accordion/CustomAccordion";
import ModuleHeader from "../../../../Common/Headers/ModuleHeader/ModuleHeader";
interface projectOf {
  ID: number;
  Title: string;
}
interface ToDoListProps {
  ProjectDetails: IProjectDetails;
  setProjectTasksList?: any;
}
const ToDoList: React.FC<ToDoListProps> = ({
  ProjectDetails,
  setProjectTasksList,
}) => {
  console.log("ProjectDetails", ProjectDetails);

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
  const cloneFormDetails = deepClone(taskFormDetails);
  // const [parentTaskID, setParentTaskID] = useState<number>();
  const [taskTypeController, setTaskTypeController] = useState<any>({
    Type: "",
    Control: "",
    ParentTaskId: 0,
    TaskId: 0,
  });
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const [projectTasksData, setProjectTasksData] = useState<
    IProjectTaskDeatils[]
  >([]);
  const [masterProjectTasksData, setMasterProjectTasksData] = useState<
    IProjectTaskDeatils[]
  >([]);
  const [selectedRow, setSelectedRow] = useState<IProjectTaskDeatils>();
  const [projectOfData, setProjectOfData] = useState<projectOf[]>([]);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [popupResponse, setPopupResponse] = useState(initialPopupResponse);
  const [isLoader, setIsLoader] = useState<boolean>(true);
  console.log(
    "taskTypeController",
    taskTypeController,
    formDetails,
    masterProjectTasksData
  );

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.TaskTitle?.value}
            type="text"
            placeholder="Enter task name"
            sectionType={ProjectDetails?.Id === 0 ? "two" : "one"}
            onChange={(value: string) => {
              onChangeFunction("TaskTitle", value, setFormDetails);
            }}
            isValid={formDetails?.TaskTitle?.isValid}
            withLabel={true}
            mandatory={formDetails?.TaskTitle?.isMandatory}
            labelText="Task name"
            readOnly={false}
            disabled={false}
          />
          {ProjectDetails?.Id === 0 && (
            <CustomAutoSelect
              value={formDetails?.ProjectOfTitle?.value}
              options={projectOfData?.map((project: any) => ({
                Text: project.Title,
                ...project,
              }))}
              onChange={async (value: { Text: string; ID: number } | null) => {
                onChangeFunction("ProjectOfTitle", value?.Text, setFormDetails);
                onChangeFunction("ProjectOfID", value?.ID, setFormDetails);
              }}
              placeholder="Select project"
              sectionType="two"
              isValid={formDetails?.ProjectOfTitle?.isValid}
              withLabel={true}
              disabled={ProjectDetails?.Id !== 0 ? true : false}
              mandatory={formDetails?.ProjectOfTitle?.isMandatory}
              labelText="Project"
            />
          )}
          <CustomInput
            value={formDetails?.Description?.value}
            type="text"
            rows={3}
            placeholder="Enter description"
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
          <CustomPeoplePicker
            selectedItem={formDetails?.AssignedTo?.value}
            sectionType="one"
            personSelectionLimit={1}
            placeholder="Select user"
            minHeight="38px"
            maxHeight="38px"
            onChange={(value: any[]) => {
              onChangeFunction("AssignedTo", value, setFormDetails);
            }}
            isValid={formDetails?.AssignedTo?.isValid}
            withLabel={true}
            mandatory={formDetails?.AssignedTo?.isMandatory}
            labelText="Person in charge"
          />
          <CustomDatePicker
            value={formDetails?.StartDate?.value}
            placeholder="Enter start date"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("StartDate", value, setFormDetails);
            }}
            isValid={formDetails?.StartDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.StartDate?.isMandatory}
            labelText="Start date"
            disabled={false}
            readOnly={false}
          />
          <CustomDatePicker
            value={formDetails?.DueDate?.value}
            placeholder="Enter due date"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("DueDate", value, setFormDetails);
            }}
            isValid={formDetails?.DueDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.DueDate?.isMandatory}
            labelText="Due date"
            disabled={false}
            readOnly={false}
          />
          <CustomDropDown
            options={["Low", "Medium", "High"]}
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
            disabled={false}
            readOnly={false}
          />
          <CustomDropDown
            options={["Not Started", "In Progress", "Completed", "Overdue"]}
            value={formDetails?.Status?.value}
            placeholder="Select status"
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
        </div>
        {/* <div>
          <PopupSectionHeader Title="PEOPLE & OTHERS" />
          <div className="section-wrapper"></div>
        </div> */}
        <div className={styles.checkBox_Wrapper}>
          <div style={{ display: "flex", gap: "8px" }}>
            <Checkbox
              inputId="sendReminder"
              checked={formDetails?.isReminder?.value}
              onChange={(e) =>
                onChangeFunction("isReminder", e.target.checked, setFormDetails)
              }
            />
            <label htmlFor="sendReminder" style={{ fontSize: "14px" }}>
              Send reminder
            </label>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
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
            <label htmlFor="isTaskOverdue" style={{ fontSize: "14px" }}>
              Escalate if task overdue
            </label>
          </div>
        </div>
      </div>,
    ],
    [
      <div key={1} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.TaskTitle?.value}
            type="text"
            placeholder="Enter task name"
            sectionType={ProjectDetails?.Id === 0 ? "two" : "one"}
            onChange={(value: string) => {
              onChangeFunction("TaskTitle", value, setFormDetails);
            }}
            isValid={formDetails?.TaskTitle?.isValid}
            withLabel={true}
            mandatory={formDetails?.TaskTitle?.isMandatory}
            labelText="Task name"
            readOnly={false}
            disabled={false}
          />
          {ProjectDetails?.Id === 0 && (
            <CustomAutoSelect
              value={formDetails?.ProjectOfTitle?.value}
              options={projectOfData?.map((project: any) => ({
                Text: project.Title,
                ...project,
              }))}
              onChange={async (option: { Text: string; ID: number } | null) => {
                onChangeFunction(
                  "ProjectOfTitle",
                  option?.Text,
                  setFormDetails
                );
                onChangeFunction("ProjectOfID", option?.ID, setFormDetails);
              }}
              placeholder="Select project"
              sectionType="two"
              isValid={formDetails?.ProjectOfTitle?.isValid}
              withLabel={true}
              disabled={ProjectDetails?.Id !== 0 ? true : false}
              mandatory={formDetails?.ProjectOfTitle?.isMandatory}
              labelText="Project"
            />
          )}
          <CustomInput
            value={formDetails?.Description?.value}
            type="text"
            rows={3}
            placeholder="Enter description"
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
          <CustomPeoplePicker
            selectedItem={formDetails?.AssignedTo?.value}
            sectionType="one"
            personSelectionLimit={1}
            placeholder="Select user"
            minHeight="38px"
            maxHeight="38px"
            onChange={(value: any[]) => {
              onChangeFunction("AssignedTo", value, setFormDetails);
            }}
            isValid={formDetails?.AssignedTo?.isValid}
            withLabel={true}
            mandatory={formDetails?.AssignedTo?.isMandatory}
            labelText="Person in charge"
          />
          <CustomDatePicker
            value={formDetails?.StartDate?.value}
            placeholder="Enter start date"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("StartDate", value, setFormDetails);
            }}
            isValid={formDetails?.StartDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.StartDate?.isMandatory}
            labelText="Start date"
            disabled={false}
            readOnly={false}
          />
          <CustomDatePicker
            value={formDetails?.DueDate?.value}
            placeholder="Enter due date"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("DueDate", value, setFormDetails);
            }}
            isValid={formDetails?.DueDate?.isValid}
            withLabel={true}
            mandatory={formDetails?.DueDate?.isMandatory}
            labelText="Due date"
            disabled={false}
            readOnly={false}
          />
          <CustomDropDown
            options={["Low", "Medium", "High"]}
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
            disabled={false}
            readOnly={false}
          />
          <CustomDropDown
            options={["Not Started", "In Progress", "Completed", "Overdue"]}
            value={formDetails?.Status?.value}
            placeholder="Select status"
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
        </div>
        {/* <div>
          <PopupSectionHeader Title="PEOPLE & OTHERS" />
          <div className="section-wrapper">
          </div>
        </div> */}
        <div className={styles.checkBox_Wrapper}>
          <div style={{ display: "flex", gap: "8px" }}>
            <Checkbox
              inputId="sendReminder"
              checked={formDetails?.isReminder?.value}
              onChange={(e) =>
                onChangeFunction("isReminder", e.target.checked, setFormDetails)
              }
            />
            <label htmlFor="sendReminder" style={{ fontSize: "14px" }}>
              Send reminder
            </label>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
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
            <label htmlFor="isTaskOverdue" style={{ fontSize: "14px" }}>
              Escalate if task overdue
            </label>
          </div>
        </div>
      </div>,
    ],
  ];
  const setEditForm = (rowData: any) => {
    const taskData = rowData;
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
      StartDate: {
        value: taskData.StartDate,
        isValid: true,
        isMandatory: true,
      },
      DueDate: {
        value: taskData.DueDate,
        isValid: true,
        isMandatory: true,
      },
      AssignedTo: {
        value: taskData.AssignTo,
        isValid: true,
        isMandatory: true,
      },
      isReminder: {
        value: taskData.isReminder,
        isValid: true,
        isMandatory: false,
      },
      isTaskOverdue: {
        value: taskData.isTaskOverdue,
        isValid: true,
        isMandatory: false,
      },
      ProjectOfTitle: {
        value: taskData.ProjectOfTitle,
        isValid: true,
        isMandatory: true,
      },
      ProjectOfID: {
        value: taskData.ProjectOfID,
        isValid: true,
        isMandatory: true,
      },
    });
    setTaskTypeController({
      Type: "Task",
      Control: "Edit",
      ParentTaskId: taskData?.ID,
      TaskId: taskData?.ID,
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Task`);
  };

  const addSubTaskForm = (taskDetails: any) => {
    console.log("taskDetails", taskDetails);

    const taskData = taskDetails;
    setSelectedRow(taskData);
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
        value: "Not Started",
        isValid: true,
        isMandatory: true,
      },
      StartDate: {
        value: "",
        isValid: true,
        isMandatory: true,
      },
      DueDate: {
        value: "",
        isValid: true,
        isMandatory: true,
      },
      AssignedTo: {
        value: [],
        isValid: true,
        isMandatory: true,
      },
      isReminder: {
        value: false,
        isValid: true,
        isMandatory: false,
      },
      isTaskOverdue: {
        value: false,
        isValid: true,
        isMandatory: false,
      },
      ProjectOfTitle: {
        value: taskData.ProjectOfTitle,
        isValid: true,
        isMandatory: false,
      },
      ProjectOfID: {
        value: taskData.ProjectOfID,
        isValid: true,
        isMandatory: false,
      },
    });
    setTaskTypeController({
      Type: "Sub Task",
      Control: "New",
      ParentTaskId: taskData?.ID,
      TaskId: 0,
    });
    togglePopupVisibility(setPopupController, 0, "open", `Add Sub Task`);
  };

  const editSubTaskForm = (subTaskDetails: any) => {
    console.log("subTaskDetails", subTaskDetails);
    const taskData = subTaskDetails;
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
      StartDate: {
        value: taskData.StartDate,
        isValid: true,
        isMandatory: true,
      },
      DueDate: {
        value: taskData.DueDate,
        isValid: true,
        isMandatory: true,
      },
      AssignedTo: {
        value: taskData.AssignTo,
        isValid: true,
        isMandatory: true,
      },
      isReminder: {
        value: taskData.isReminder,
        isValid: true,
        isMandatory: false,
      },
      isTaskOverdue: {
        value: taskData.isTaskOverdue,
        isValid: true,
        isMandatory: false,
      },
      ProjectOfTitle: {
        value: taskData.ProjectOfTitle,
        isValid: true,
        isMandatory: false,
      },
      ProjectOfID: {
        value: taskData.ProjectOfID,
        isValid: true,
        isMandatory: false,
      },
    });
    setTaskTypeController({
      Type: "Sub Task",
      Control: "Edit",
      ParentTaskId: subTaskDetails?.ParentId,
      TaskId: subTaskDetails?.ID,
    });
    togglePopupVisibility(setPopupController, 0, "open", `Update Sub Task`);
  };

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);

    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (taskTypeController?.Type === "Task") {
        await submitProjectTaskForm(
          formDetails,
          setMasterProjectTasksData,
          setProjectTasksData,
          tasksUpdateToAllTasks,
          setPopupResponse,
          0
        );
      } else if (taskTypeController?.Type === "Sub Task") {
        await submitSubTaskForm(
          formDetails,
          setMasterProjectTasksData,
          setProjectTasksData,
          taskTypeController,
          setPopupResponse,
          0
        );
      }
    }
  };
  const handleUpdateFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      if (taskTypeController?.Type === "Task") {
        setPopupResponseFun(setPopupResponse, 0, true, "", "");
        updateProjectTaskForm(
          formDetails,
          selectedRow?.ID,
          setMasterProjectTasksData,
          setProjectTasksData,
          tasksUpdateToAllTasks,
          setPopupResponse,
          0
        );
      } else if (taskTypeController?.Type === "Sub Task") {
        await updateSubTaskForm(
          formDetails,
          setMasterProjectTasksData,
          setProjectTasksData,
          taskTypeController,
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
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          taskTypeController?.Control === "New"
            ? handleSubmitFuction()
            : handleUpdateFuction();
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
          setPopupResponseFun(setPopupResponse, 1, false, "", "");
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
  // const onRowExpand = (e: any) => {
  //   const rowData = e.data;
  //   setParentTaskID(rowData?.ID);
  //   getSubtasksData(rowData?.ID, setSubTasksMap, setIsSubTaskLoader);
  // };
  // const onRowCollapse = (row: any) => {
  //   setExpandedRows(null);
  // };
  // const rowExpansionTemplate = (data: IProjectTaskDeatils) => {
  //   const subtasks = subTasksMap[data.ID] || [];
  //   return isSubTaskLoader ? (
  //     <AppLoader />
  //   ) : (
  //     <div className="subtask_wrapper">
  //       <div className="subTaskButton">
  //         <DefaultButton
  //           btnType="primaryBtn"
  //           text="Add Sub Task"
  //           startIcon={<AddIcon />}
  //           onClick={() => {
  //             setTaskPopupController({
  //               Type: "SubTask",
  //             });
  //             // setFormDetails(deepClone(cloneFormDetails));
  //             setInitialState();
  //             togglePopupVisibility(
  //               setPopupController,
  //               0,
  //               "open",
  //               `Add Sub Task`
  //             );
  //           }}
  //         />
  //       </div>
  //       <DataTable value={subtasks} emptyMessage="No subtasks available">
  //         <Column
  //           field="TaskTitle"
  //           header="Task name"
  //           style={{ minWidth: "25%", maxWidth: "25%" }}
  //           body={(rowData) => <OnTextRender text={rowData?.TaskTitle} />}
  //           sortable
  //         />
  //         <Column
  //           field="CreatedBy"
  //           header="Assigned by"
  //           style={{ minWidth: "15%", maxWidth: "25%" }}
  //           body={(rowData) => <OnUsersRender users={rowData?.CreatedBy} />}
  //           sortable
  //         />
  //         <Column
  //           field="AssignTo"
  //           header="Person in charge"
  //           style={{ minWidth: "15%", maxWidth: "25%" }}
  //           body={(rowData) => <OnUsersRender users={rowData?.AssignTo} />}
  //           sortable
  //         />
  //         <Column
  //           field="StartDate"
  //           header="Start date"
  //           style={{ minWidth: "15%", maxWidth: "25%" }}
  //           body={(rowData) => <OnDateRender date={rowData?.StartDate} />}
  //           sortable
  //         />
  //         <Column
  //           field="DueDate"
  //           header="Due date"
  //           style={{ minWidth: "15%", maxWidth: "25%" }}
  //           body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
  //           sortable
  //         />
  //         <Column
  //           field="Status"
  //           header="Status"
  //           style={{ minWidth: "15%" }}
  //           body={(rowData) => <OnStatusRender status={rowData?.Status} />}
  //           sortable
  //         />
  //         <Column
  //           field=""
  //           header="Actions"
  //           style={{ minWidth: "15%" }}
  //           body={(rowData) => (
  //             <OnActionsRender
  //               editAction={setEditForm}
  //               isShowLunch={false}
  //               isShowUserAccess={false}
  //               rowData={rowData}
  //             />
  //           )}
  //         />
  //       </DataTable>
  //     </div>
  //   );
  // };

  const tableColumns = [
    [
      <DataTable
        value={projectTasksData}
        dataKey="ID"
        className={
          ProjectDetails?.ProjectName !== ""
            ? "min_height_48vh"
            : "min_height_62vh"
        }
        scrollable
        scrollHeight={ProjectDetails?.ProjectName !== "" ? "48vh" : "62vh"}
        style={{ minWidth: "100%" }}
        key={0}
        paginator
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate={`Showing {first} to {last} of {totalRecords} ${
          projectTasksData?.length === 0 ? "record" : "records"
        }`}
        emptyMessage="No data found."
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column
          field="TaskTitle"
          header="Task name"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.TaskTitle} />}
          sortable
        />
        {/* <Column
          field="Priority"
          header="Priority"
          style={{ minWidth: "25%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Priority} />}
          sortable
        /> */}
        <Column
          field="CreatedBy"
          header="Assigned by"
          style={{ minWidth: "15%", maxWidth: "25%" }}
          body={(rowData) => <OnUsersRender users={rowData?.CreatedBy} />}
          sortable
        />
        <Column
          field="AssignTo"
          header="Person in charge"
          style={{ minWidth: "15%", maxWidth: "25%" }}
          body={(rowData) => <OnUsersRender users={rowData?.AssignTo} />}
          sortable
        />
        <Column
          field="StartDate"
          header="Start date"
          style={{ minWidth: "15%", maxWidth: "25%" }}
          body={(rowData) => <OnDateRender date={rowData?.StartDate} />}
          sortable
        />
        <Column
          field="DueDate"
          header="Due date"
          style={{ minWidth: "15%", maxWidth: "25%" }}
          body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
          sortable
        />
        <Column
          field="Status"
          header="Status"
          style={{ minWidth: "15%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Status} />}
          sortable
        />
        <Column
          field=""
          header="Actions"
          style={{ minWidth: "20%" }}
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

  console.log("tableColumns", tableColumns);

  const tasksUpdateToAllTasks = (allTasks: IProjectTaskDeatils) => {
    setProjectTasksList?.(allTasks);
  };

  useEffect(() => {
    getProjectList(setProjectOfData);
    fetchProjectTasks(
      setMasterProjectTasksData,
      setProjectTasksData,
      tasksUpdateToAllTasks,
      ProjectDetails?.Id,
      setIsLoader
    );
  }, []);

  const setInitialState = () => {
    if (ProjectDetails?.ProjectName !== "") {
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
          value: "Not Started",
          isValid: true,
          isMandatory: true,
        },
        StartDate: {
          value: "",
          isValid: true,
          isMandatory: true,
        },
        DueDate: {
          value: "",
          isValid: true,
          isMandatory: true,
        },
        AssignedTo: {
          value: [],
          isValid: true,
          isMandatory: true,
        },
        isReminder: {
          value: "",
          isValid: true,
          isMandatory: false,
        },
        isTaskOverdue: {
          value: "",
          isValid: true,
          isMandatory: false,
        },
        ProjectOfTitle: {
          value: ProjectDetails?.ProjectName,
          isValid: true,
          isMandatory: true,
        },
        ProjectOfID: {
          value: ProjectDetails?.Id,
          isValid: true,
          isMandatory: true,
        },
      });
    } else {
      setFormDetails(deepClone(cloneFormDetails));
    }
  };

  const searchFilterFunctionality = (value: string) => {
    const filteredOptions = masterProjectTasksData.filter(
      (item) =>
        item.TaskTitle.toLowerCase().includes(value.toLowerCase()) ||
        item.Priority.toLowerCase().includes(value.toLowerCase()) ||
        item.Status.toLowerCase().includes(value.toLowerCase())
    );
    setProjectTasksData(filteredOptions);
  };

  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.TodoList_Wrapper}>
      <div
        className={
          ProjectDetails?.ProjectName !== ""
            ? "justify-end margin-top-10"
            : "justify-space-between"
        }
      >
        {ProjectDetails?.ProjectName === "" && (
          <ModuleHeader title="My Tasks" />
        )}
        <div className="gap-10">
          <CustomSearchInput searchFunction={searchFilterFunctionality} />
          <DefaultButton
            btnType="primaryBtn"
            text="Add Task"
            startIcon={<AddIcon />}
            onClick={() => {
              setTaskTypeController({
                Type: "Task",
                Control: "New",
                ParentTaskId: 0,
                TaskId: 0,
              });
              // setFormDetails(deepClone(cloneFormDetails));
              setInitialState();
              togglePopupVisibility(setPopupController, 0, "open", `Add Task`);
            }}
          />
        </div>
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
      <div className={styles.TodoList_main}>
        {/* <CustomDataTable table={tableColumns[0]} /> */}
        <CustomAccordion
          tasksData={projectTasksData}
          editTaskForm={setEditForm}
          addSubTaskForm={addSubTaskForm}
          editSubTaskForm={editSubTaskForm}
        />
      </div>
    </div>
  );
};

export default ToDoList;
