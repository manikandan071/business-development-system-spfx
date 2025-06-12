/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-var-requires */

import { Accordion, AccordionTab } from "primereact/accordion";
import * as React from "react";
import { useState } from "react";
import {
  // IProjectSubTaskDeatils,
  IProjectTaskDeatils,
} from "../../../../../Interface/ModulesInterface";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnDateRender,
  OnStatusRender,
  OnTextRender,
  OnUsersRender,
} from "../../../../../Utils/dataTable";
import "./CustomAccordion.css";
const taskIcon = require("../../../assets/images/png/navImages/list-check-active.png");

interface ICustomAccordionProps {
  tasksData: IProjectTaskDeatils[];
  editTaskForm: any;
  addSubTaskForm: any;
  editSubTaskForm: any;
}

const CustomAccordion: React.FC<ICustomAccordionProps> = ({
  tasksData,
  editTaskForm,
  addSubTaskForm,
  editSubTaskForm,
}) => {
  console.log("tasksData", tasksData);

  const [activeIndex, setActiveIndex] = useState<number | number[]>();

  const setTaskEdit = (taskDetails: any) => {
    editTaskForm(taskDetails);
  };
  const setSubTaskNew = (taskDetails: any) => {
    addSubTaskForm(taskDetails);
  };

  const setSubTaskEdit = (subTaskDetails: any) => {
    editSubTaskForm(subTaskDetails);
  };

  const headerRender = (taskDetails: IProjectTaskDeatils) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ width: "30%" }} className="accordion_task_name">
          <span>{taskDetails?.TaskTitle}</span>
        </div>
        <div style={{ width: "20%" }} className="column_wrapper">
          <OnDateRender date={taskDetails?.StartDate} />
        </div>
        <div style={{ width: "20%" }} className="column_wrapper">
          <OnDateRender date={taskDetails?.DueDate} />
        </div>
        <div style={{ width: "20%" }} className="column_wrapper">
          <OnUsersRender users={taskDetails?.CreatedBy || []} />
        </div>
        <div style={{ width: "10%" }} className="column_wrapper">
          <OnActionsRender
            editAction={setTaskEdit}
            launchAction={setSubTaskNew}
            isShowLunch={false}
            isShowUserAccess={false}
            isShowSubTask={true}
            rowData={taskDetails}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="custom_accordion_wrapper">
      <div className="accordion_header_wrapper">
        <img src={taskIcon} width={12} height={12} />
        <div style={{ width: "30%", paddingLeft: "10px" }} className="header">
          Task name
        </div>
        <div style={{ width: "20%" }} className="header">
          Start date
        </div>
        <div style={{ width: "20%" }} className="header">
          Due date
        </div>
        <div style={{ width: "20%" }} className="header">
          Created by
        </div>
        {/* <div style={{ width: "15%" }} className="header">
          Status
        </div> */}
        <div style={{ width: "10%" }} className="header">
          Actions
        </div>
      </div>
      <Accordion
        multiple
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {tasksData?.map((tasks: IProjectTaskDeatils) => {
          return (
            <AccordionTab
              header={tasks?.TaskTitle}
              headerTemplate={headerRender(tasks)}
            >
              {tasks?.SubTasks?.length === 0 ? (
                <div
                  className="no_data_found_message"
                  style={{ padding: "8px" }}
                >
                  No sub tasks found
                </div>
              ) : (
                <DataTable
                  value={tasks?.SubTasks}
                  tableStyle={{ minWidth: "60rem" }}
                >
                  <Column
                    field="TaskTitle"
                    header="Task name"
                    style={{ width: "25%" }}
                    body={(rowData) => (
                      <OnTextRender text={rowData?.TaskTitle} />
                    )}
                    sortable
                    headerClassName="custom-sort-icon"
                  />
                  <Column
                    field="CreatedBy"
                    header="Assigned by"
                    style={{ width: "15%" }}
                    body={(rowData) => (
                      <OnUsersRender users={rowData?.CreatedBy} />
                    )}
                    headerClassName="custom-sort-icon"
                  />
                  <Column
                    field="AssignTo"
                    header="Person in charge"
                    style={{ width: "15%" }}
                    body={(rowData) => (
                      <OnUsersRender users={rowData?.AssignTo} />
                    )}
                    headerClassName="custom-sort-icon"
                  />
                  {/* <Column
                    field="StartDate"
                    header="Start date"
                    style={{ width: "15%" }}
                    body={(rowData) => (
                      <OnDateRender date={rowData?.StartDate} />
                    )}
                    sortable
                    headerClassName="custom-sort-icon"
                  /> */}
                  <Column
                    field="DueDate"
                    header="Due date"
                    style={{ width: "15%" }}
                    body={(rowData) => <OnDateRender date={rowData?.DueDate} />}
                    sortable
                    headerClassName="custom-sort-icon"
                  />
                  <Column
                    field="Status"
                    header="Status"
                    style={{ width: "15%" }}
                    body={(rowData) => (
                      <OnStatusRender status={rowData?.Status} />
                    )}
                    sortable
                    headerClassName="custom-sort-icon"
                  />
                  <Column
                    field=""
                    header="Actions"
                    style={{ minWidth: "10%" }}
                    body={(rowData) => (
                      <OnActionsRender
                        editAction={setSubTaskEdit}
                        isShowLunch={false}
                        isShowUserAccess={false}
                        rowData={rowData}
                      />
                    )}
                  />
                </DataTable>
              )}
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CustomAccordion;
