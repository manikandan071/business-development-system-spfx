/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */

import styles from "../webparts/businessDevelopmentSystem/components/Modules/Countries/Countries.module.scss";
import Profiles from "../webparts/businessDevelopmentSystem/components/Common/Profile/Profiles";
import LaunchIcon from "@mui/icons-material/Launch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import * as React from "react";
import * as dayjs from "dayjs";
import "./dataTable.css";

interface IActionsProps {
  openProjectAction?: React.Dispatch<React.SetStateAction<any>>;
  userAccessAction?: React.Dispatch<React.SetStateAction<any>>;
  rowData: any;
}
interface IStatusRenderProps {
  status: string;
}

export const OnTextRender = (text: any) => {
  console.log("text", text);

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "var(--basic-font-color)",
        fontSize: "13px",
        fontWeight: "400",
      }}
    >
      {text?.text}
    </div>
  );
};

export const OnActionsRender: React.FC<IActionsProps> = ({
  openProjectAction,
  userAccessAction,
  rowData,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <LaunchIcon
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          color: "#60553b",
        }}
        onClick={() => {
          openProjectAction?.(rowData);
        }}
      />
      <GroupAddIcon
        style={{
          width: "20px",
          height: "20px",
          cursor: "pointer",
          color: "#60553b",
        }}
        onClick={() => {
          userAccessAction?.(rowData);
        }}
      />
    </div>
  );
};

export const OnStatusRender: React.FC<IStatusRenderProps> = ({ status }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        className={`status-badge ${status?.toLowerCase().replace(/\s/g, "-")}`}
      >
        {status}
      </span>
    </div>
  );
};

export const OnDateRender = (date: any) => {
  console.log("date", date);

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "var(--basic-font-color)",
        fontSize: "13px",
        fontWeight: "400",
      }}
    >
      {dayjs(date?.date).format("D MMM YYYY")}
    </div>
  );
};

export const OnCountryRender = (rowData: any) => {
  const code = rowData?.rowData;
  const flagImg = `https://flagcdn.com/64x48/${code.ISOCode?.toLowerCase()}.png`;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          style={{ borderRadius: "50%", marginRight: "15px" }}
          src={flagImg}
          height="28px"
          width="28px"
        />
        <span>{code.countryName}</span>
      </div>
    </>
  );
};
export const OnProjectCountRender = (rowData: any) => {
  return (
    <>
      <div className={styles.projectCount}>
        <span className={styles.projectnumber}>05</span>
        <span>Projects</span>
      </div>
    </>
  );
};
export const OnManagerRender = (rowData: any) => {
  const code = rowData?.rowData ;
  console.log("RowData",code);
  return (
    <>
      <div>
          <Profiles
            value={code}
            maxVisible={code.length === 1 ? 1 : 3}
          />
      </div>
    </>
  );
};
export const OnCountryStatusRender = (rowData: any) => {
  const code = rowData?.rowData;
  return (
    <>
      <div className={styles.cardStatus}>
        <i
          className="pi pi-circle-fill"
          style={{ fontSize: "6px", placeSelf: "center" }}
        />
        <span>{code.Status}</span>
      </div>
    </>
  );
};
export const OnCountryActionsRender: React.FC = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LaunchIcon
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      />
      <GroupAddIcon
        style={{
          marginLeft: "10px",
          width: "20px",
          height: "20px",
          cursor: "pointer",
        }}
      />
    </div>
  );
};
