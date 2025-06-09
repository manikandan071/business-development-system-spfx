/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import { ITasksDetails } from "../../../../../../../Interface/ModulesInterface";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnDateRender,
  OnStatusRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import "./UpComingTasks.css";

interface IUpcomingTasksProps {
  tasksData: ITasksDetails[];
  viewAllTasks: any;
}

const UpComingTasks: React.FC<IUpcomingTasksProps> = ({
  tasksData,
  viewAllTasks,
}) => {
  const tableColumns = [
    [
      <DataTable
        value={[...tasksData].sort(
          (a, b) =>
            new Date(a.DueDate).getTime() - new Date(b.DueDate).getTime()
        )}
        scrollable
        scrollHeight="37vh"
        style={{ minWidth: "100%" }}
        key={0}
        // paginator
        rows={10}
        // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
        emptyMessage="No records found."
      >
        <Column
          field="TaskTitle"
          header="Task name"
          style={{ width: "50%" }}
          body={(rowData) => <OnTextRender text={rowData?.TaskTitle} />}
          sortable
        />
        {/* <Column
          field="StartDate"
          header="StartDate"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnDateRender text={rowData?.StartDate} />}
        /> */}
        <Column
          field="DueDate"
          header="Due date"
          style={{ width: "25%" }}
          body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
          sortable
        />
        <Column
          field="Status"
          header="Status"
          style={{ width: "25%" }}
          body={(rowData) => <OnStatusRender status={rowData?.Status} />}
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
    <div style={{ height: "100%" }}>
      <div className="event-header">
        <span>Upcoming Tasks ({tasksData?.length})</span>
        <button onClick={() => viewAllTasks()}>view all</button>
      </div>
      <div className="upComing_tasks_container">
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default UpComingTasks;
