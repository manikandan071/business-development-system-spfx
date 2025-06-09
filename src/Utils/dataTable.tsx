/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */

import styles from "../webparts/businessDevelopmentSystem/components/Modules/Countries/Countries.module.scss";
import Profiles from "../webparts/businessDevelopmentSystem/components/Common/Profile/Profiles";
import LaunchIcon from "@mui/icons-material/Launch";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import * as React from "react";
import dayjs from "dayjs";
const editIcon = require("../webparts/businessDevelopmentSystem/assets/images/png/edit.png");
const launchIcon = require("../webparts/businessDevelopmentSystem/assets/images/png/document.png");
const usersIcon = require("../webparts/businessDevelopmentSystem/assets/images/png/adduser.png");
import "./dataTable.css";

interface IActionsProps {
  editAction?: React.Dispatch<React.SetStateAction<any>>;
  userAccessAction?: React.Dispatch<React.SetStateAction<any>>;
  launchAction?: React.Dispatch<React.SetStateAction<any>>;
  isShowLunch?: boolean;
  isShowUserAccess?: boolean;
  rowData: any;
}
interface IStatusRenderProps {
  status: string;
}

export const OnTextRender = (text: any) => {
  return (
    <div
      style={{
        color: "var(--basic-font-color)",
        fontSize: "13px",
        fontWeight: "400",
      }}
      className="ellipsis-3-lines "
    >
      {text?.text}
    </div>
  );
};

export const OnActionsRender: React.FC<IActionsProps> = ({
  editAction,
  userAccessAction,
  launchAction,
  isShowLunch = true,
  isShowUserAccess = true,
  rowData,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "5px",
      }}
    >
      <img
        src={editIcon}
        style={{
          width: "18px",
          height: "18px",
          cursor: "pointer",
        }}
        alt=""
        onClick={(e) => {
          e.stopPropagation();
          editAction?.(rowData);
        }}
        title="Edit"
      />
      {isShowUserAccess && (
        <img
          src={usersIcon}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
          }}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            userAccessAction?.(rowData);
          }}
          title="Manage Access"
        />
      )}
      {isShowLunch && (
        <img
          src={launchIcon}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
          }}
          alt=""
          onClick={(e) => {
            e.stopPropagation();
            launchAction?.(rowData);
          }}
          title="Lookup"
        />
      )}
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
export const OnDateAndTimeRender = (date: any) => {
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
      {dayjs(date?.date).format("D MMM YYYY, h:mm A")}
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
          style={{ borderRadius: "50%", marginRight: "10px" }}
          src={flagImg}
          height="28px"
          width="28px"
        />
        <span className="country_name_text">{code.countryName}</span>
      </div>
    </>
  );
};
export const OnProjectCountRender: React.FC<{ rowData: any; onClick: any }> = ({
  rowData,
  onClick,
}) => {
  return (
    <>
      <div className="projectCount" onClick={() => onClick?.(rowData)}>
        <span className="projectnumber">
          {rowData?.ProjectCount < 10
            ? `0${rowData?.ProjectCount}`
            : rowData?.ProjectCount}
        </span>
        <span>{rowData?.ProjectCount < 2 ? "Project" : "Projects"}</span>
      </div>
    </>
  );
};
export const OnManagerRender = (rowData: any) => {
  const code = rowData?.rowData;
  return (
    <>
      <div>
        <Profiles value={code} maxVisible={code.length === 1 ? 1 : 3} />
      </div>
    </>
  );
};
export const OnUsersRender: React.FC<{ users: any[] }> = ({ users }) => {
  return (
    <>
      <div>
        <Profiles value={users} maxVisible={users?.length === 1 ? 1 : 3} />
      </div>
    </>
  );
};

export const OnCountryStatusRender: React.FC<{ status: string }> = ({
  status,
}) => {
  return (
    <>
      <div className={styles.cardStatus}>
        <i
          className="pi pi-circle-fill"
          style={{ fontSize: "6px", placeSelf: "center" }}
        />
        <span>{status}</span>
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

export const getFileIcon = (name: string) => {
  const extension = name.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon style={{ color: "red" }} />;
    case "doc":
    case "docx":
      return <DescriptionIcon style={{ color: "blue" }} />;
    case "xls":
    case "xlsx":
      return <DescriptionIcon style={{ color: "green" }} />;
    case "png":
    case "jpg":
    case "jpeg":
      return <ImageIcon style={{ color: "orange" }} />;
    case "txt":
      return <InsertDriveFileIcon style={{ color: "gray" }} />;
    default:
      return <InsertDriveFileIcon />;
  }
};
