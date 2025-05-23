import * as React from "react";
import styles from "./Projects.module.scss";
import { Column } from "primereact/column";
import CustomDataTable from "../../Common/DataTable/DataTable";
import { DataTable } from "primereact/datatable";
import { OnTextRender } from "../../../../../Utils/dataTable";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import CustomSearchInput from "../../Common/CustomInputFields/CustomSearchInput/CustomSearchInput";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";

const Projects: React.FC = () => {
  const customers = [
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
    {
      id: 1000,
      name: "John Doe",
      country: { name: "USA", code: "US" },
      company: "ABC Corp",
      representative: {
        name: "Jane Smith",
        image: "images/avatar/amyelsner.png",
      },
    },
    {
      id: 1001,
      name: "Jane Smith",
      country: { name: "UK", code: "GB" },
      company: "XYZ Ltd",
      representative: { name: "John Doe", image: "images/avatar/johndoe.png" },
    },
  ];

  const tableColumns = [
    [
      <DataTable
        value={customers}
        scrollable
        scrollHeight="400px"
        style={{ minWidth: "100%" }}
        key={0}
      >
        <Column
          field="name"
          header="Name"
          style={{ minWidth: "25%" }}
          body={(rowData) => <OnTextRender text={rowData?.name} />}
          sortable
        />
        <Column
          field="country.name"
          header="Country"
          style={{ minWidth: "25%" }}
          sortable
        />
        <Column
          field="representative.name"
          header="Representative"
          style={{ minWidth: "25%" }}
          sortable
        />
        <Column
          field="company"
          header="Company"
          style={{ minWidth: "25%" }}
          sortable
        />
      </DataTable>,
    ],
  ];
  return (
    <div className={styles.projects_container}>
      <div className="justify-space-between margin-right-20">
        <ModuleHeader title="Projects" />
        <div className="gap-10">
          <CustomSearchInput />
          <DefaultButton
            btnType="primaryBtn"
            text="Add new project"
            startIcon={<AddIcon />}
          />
        </div>
      </div>
      <div className={styles.projects_Wrapper}>
        <CustomDataTable table={tableColumns[0]} />
      </div>
    </div>
  );
};

export default Projects;
