/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import styles from "./Documents.module.scss";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import CustomSearchInput from "../../../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import CustomDataTable from "../../../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  OnActionsRender,
  OnTextRender,
} from "../../../../../../../Utils/dataTable";
import { useState } from "react";

const Documents: React.FC = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState<boolean>(false);
  console.log("isDocumentOpen", isDocumentOpen);

  const documentsData = [
    {
      id: 1,
      documentName: "Project Plan",
      manageAccess: "View, Edit",
      party: "Client A",
    },
    {
      id: 2,
      documentName: "Budget Report",
      manageAccess: "View Only",
      party: "Client B",
    },
    {
      id: 3,
      documentName: "Contract Agreement",
      manageAccess: "View, Edit, Delete",
      party: "Client C",
    },
    {
      id: 4,
      documentName: "Risk Assessment",
      manageAccess: "View Only",
      party: "Client D",
    },
    {
      id: 5,
      documentName: "Meeting Minutes",
      manageAccess: "View, Edit",
      party: "Client E",
    },
  ];

  const tableColumns = [
    [
      <DataTable
        value={documentsData}
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
          field="documentName"
          header="Document Name"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.documentName} />}
          sortable
        />
        <Column
          field="manageAccess"
          header="Manage Access"
          style={{ minWidth: "25%", maxWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.manageAccess} />}
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
          field=""
          header="Actions"
          style={{ minWidth: "20%" }}
          body={(rowData) => (
            <OnActionsRender setDocumentOpen={setIsDocumentOpen} />
          )}
        />
      </DataTable>,
    ],
  ];

  return (
    <div className={styles.Documents_wrapper}>
      <div className="justify-end gap-10">
        <CustomSearchInput />
        <DefaultButton
          btnType="primaryBtn"
          text="Add new documents"
          startIcon={<AddIcon />}
        />
      </div>
      <div className={styles.Documents_main}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default Documents;
