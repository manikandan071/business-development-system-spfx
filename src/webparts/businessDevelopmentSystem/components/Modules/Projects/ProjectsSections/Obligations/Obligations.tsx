/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import styles from "./Obligations.module.scss";
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

const Obligations: React.FC = () => {
  const obligations = [
    {
      id: 1,
      contractType: "Contractual Obligation 1",
      party: "USA",
      clause: "Clause 1",
      description: "Description of the obligation",
      status: "Missed",
    },
    {
      id: 2,
      contractType: "Contractual Obligation 2",
      party: "UK",
      clause: "Clause 2",
      description: "Description of the obligation",
      status: "Completed",
    },
    {
      id: 3,
      contractType: "Contractual Obligation 3",
      party: "Canada",
      clause: "Clause 3",
      description: "Description of the obligation",
      status: "Completed",
    },
    {
      id: 4,
      contractType: "Contractual Obligation 4",
      party: "Australia",
      clause: "Clause 4",
      description: "Description of the obligation",
      status: "Missed",
    },
    {
      id: 5,
      contractType: "Contractual Obligation 5",
      party: "Germany",
      clause: "Clause 5",
      description: "Description of the obligation",
      status: "Missed",
    },
    {
      id: 6,
      contractType: "Contractual Obligation 6",
      party: "France",
      clause: "Clause 6",
      description: "Description of the obligation",
      status: "Completed",
    },
    {
      id: 7,
      contractType: "Contractual Obligation 7",
      party: "Italy",
      clause: "Clause 7",
      description: "Description of the obligation",
      status: "Completed",
    },
    {
      id: 8,
      contractType: "Contractual Obligation 8",
      party: "Spain",
      clause: "Clause 8",
      description: "Description of the obligation",
      status: "Missed",
    },
    {
      id: 9,
      contractType: "Contractual Obligation 9",
      party: "Japan",
      clause: "Clause 9",
      description: "Description of the obligation",
      status: "Completed",
    },
    {
      id: 10,
      contractType: "Contractual Obligation 10",
      party: "China",
      clause: "Clause 10",
      description: "Description of the obligation",
      status: "Missed",
    },
  ];

  const tableColumns = [
    [
      <DataTable
        value={obligations}
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
          field="contractType"
          header="Contract Type"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.contractType} />}
          sortable
        />
        <Column
          field="party"
          header="Party"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.party} />}
          sortable
        />
        <Column
          field="clause"
          header="Clause"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.clause} />}
          sortable
        />
        <Column
          field="status"
          header="status"
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
    <div className={styles.Obligations_Wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new contractual obligations"
          startIcon={<AddIcon />}
        />
      </div>
      <div className={styles.Obligations_main}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default Obligations;
