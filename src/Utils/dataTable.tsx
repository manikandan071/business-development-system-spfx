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

interface IActionsProps {
  setActiveProjectTab?: React.Dispatch<React.SetStateAction<string>>;
  setDocumentOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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
        color: "#0078d4",
        fontSize: "14px",
        fontWeight: "400",
      }}
    >
      {text?.text}
    </div>
  );
};

export const OnActionsRender: React.FC<IActionsProps> = ({
  setActiveProjectTab,
  setDocumentOpen,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LaunchIcon
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
        onClick={() => {
          setActiveProjectTab?.("Obligations");
          setDocumentOpen?.(true);
        }}
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

export const OnStatusRender: React.FC<IStatusRenderProps> = ({ status }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          width: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 10px",
          borderRadius: "5px",
          fontSize: "14px",
          backgroundColor:
            status === "Completed"
              ? "#9ef5a1"
              : status === "Missed"
              ? "#ff9393"
              : "#d9edf7",
          color:
            status === "Completed"
              ? "#2b2b2b"
              : status === "Missed"
              ? "#2b2b2b"
              : "#31708f",
        }}
      >
        {status}
      </span>
    </div>
  );
};
export const OnTaskStatusRender: React.FC<IStatusRenderProps> = ({
  status,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          width: "15vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px 10px",
          borderRadius: "5px",
          fontSize: "14px",
          border: `1px solid ${
            status === "Completed"
              ? "#e4efe5"
              : status === "Pending"
              ? "#efe9d8"
              : status === "Overdue"
              ? "#efdbd8"
              : "#d9edf7"
          }`,
          backgroundColor:
            status === "Completed"
              ? "#f2fef4"
              : status === "Pending"
              ? "#fef7e6"
              : status === "Overdue"
              ? "#fee9e6"
              : "#d9edf7",
          color:
            status === "Completed"
              ? "#006f04"
              : status === "Pending"
              ? "#6f4f00"
              : status === "Overdue"
              ? "#6f1600"
              : "#d9edf7",
        }}
      >
        {status}
      </span>
    </div>
  );
};

export const OnCountryRender = (rowData: any) => {
  const code = rowData?.rowData;
  const flagImg = `https://flagcdn.com/64x48/${code.ISOCode?.toLowerCase()}.png`;

  return (
    <>
      {rowData.header === "name" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{ borderRadius: "50%", marginRight: "15px" }}
            src={flagImg}
            height="28px"
            width="28px"
          />
          <span>{code.countryName}</span>
        </div>
      ) : rowData.header === "projectCount" ? (
        <div className={styles.projectCount}>
          <span className={styles.projectnumber}>05</span>
          <span>Projects</span>
        </div>
      ) : rowData.header === "ManagerAccess" ? (
        <div>
          {code.Manager && (
            <Profiles
              value={code.Manager}
              maxVisible={code.Manager.length === 1 ? 1 : 3}
            />
          )}
        </div>
      ) : rowData.header === "Status" ? (
        <div className={styles.cardStatus}>
          <i
            className="pi pi-circle-fill"
            style={{ fontSize: "6px", placeSelf: "center" }}
          />
          <span> Active</span>
        </div>
      ) : null}
    </>
  );
};
