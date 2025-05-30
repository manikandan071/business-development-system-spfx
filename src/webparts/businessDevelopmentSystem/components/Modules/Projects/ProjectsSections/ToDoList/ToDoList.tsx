/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import styles from "./ToDoList.module.scss";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSearchInput from "../../../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnStatusRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";

const ToDoList: React.FC = () => {
  const toDoList = [
    {
      id: 1,
      taskName: "Complete project proposal",
      assignedBy: "Alice Johnson",
      deadline: "2025-05-20",
      status: "Overdue",
    },
    {
      id: 2,
      taskName: "Review budget estimates",
      assignedBy: "Bob Smith",
      deadline: "2025-05-22",
      status: "Pending",
    },
    {
      id: 3,
      taskName: "Prepare presentation slides",
      assignedBy: "Charlie Brown",
      deadline: "2025-05-25",
      status: "Completed",
    },
    {
      id: 4,
      taskName: "Conduct market research",
      assignedBy: "Diana Prince",
      deadline: "2025-05-30",
      status: "Overdue",
    },
    {
      id: 5,
      taskName: "Finalize contract terms",
      assignedBy: "Ethan Hunt",
      deadline: "2025-06-01",
      status: "Pending",
    },
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
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
      >
        <Column
          field="taskName"
          header="Task Name"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.taskName} />}
          sortable
        />
        <Column
          field="assignedBy"
          header="Assigned By"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.assignedBy} />}
          sortable
        />
        <Column
          field="deadline"
          header="Deadline"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.deadline} />}
          sortable
        />
        <Column
          field="status"
          header="Status"
          style={{ minWidth: "25%" }}
          body={(rowData) => <OnStatusRender status={rowData?.status} />}
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

  return (
    <div className={styles.TodoList_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new to-do"
          startIcon={<AddIcon />}
        />
      </div>
      <div className={styles.TodoList_main}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default ToDoList;
