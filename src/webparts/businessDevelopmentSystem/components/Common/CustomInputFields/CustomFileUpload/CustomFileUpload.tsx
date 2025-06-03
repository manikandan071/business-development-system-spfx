/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import { useState } from "react";

import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import styles from "./CustomFileUpload.module.scss";
import { removeCategoryFromFileName } from "../../../../../../Services/CommonService/CommonService";
const uploadImage = require("../../../../assets/images/png/upload.png");
interface IDocumentsProps {
  value: any[];
  DeletedValue: any[];
  categoryValue: string;
  onChange: (value: any[], isDeletion: boolean) => void;
  isValid: boolean;
}

const CustomFileUpload: React.FC<IDocumentsProps> = ({
  value,
  DeletedValue,
  categoryValue,
  onChange,
  isValid,
}) => {
  console.log("value", value);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log("Dropped files:", files);
    // Upload logic here...
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map((file: File) => ({
      name: file.name,
      file: file,
    }));

    const mergedFiles = [...value, ...newFiles].filter(
      (file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
    );

    onChange?.(mergedFiles, false);

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const fileToRemove = value[index];

    // If already uploaded, defer deletion
    if (fileToRemove.uploaded && fileToRemove.serverRelativeUrl) {
      onChange?.([...DeletedValue, fileToRemove], true);
    }

    const updated = [...value];
    updated.splice(index, 1);
    onChange?.(updated, false);
  };

  const getFileIcon = (name: string) => {
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

  return (
    <>
      <div
        className={`${styles.file_upload_wrapper} ${
          isValid ? "" : styles.sectionError
        }
        }`}
      >
        <label
          htmlFor="file-upload"
          className={`${styles.file_upload_box} ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={styles.upload_icon}>
            <img src={uploadImage} alt="upload icon" width={60} />
          </div>

          <p className={styles.upload_text}>
            Click or drag file to this area to upload
          </p>

          {/* <span className="upload_button">Browse</span> */}

          <input
            id="file-upload"
            type="file"
            className={styles.file_input}
            onChange={handleFileChange}
            multiple
          />
        </label>
      </div>
      <div className={styles.attchments_card_wrapper}>
        {value?.map((attchment: any, index: number) => {
          return (
            <div className={styles.card_wrapper} key={index}>
              <div className={styles.file_container}>
                {getFileIcon(attchment.name)}
                <span className={styles.file_name}>
                  {removeCategoryFromFileName(attchment.name, categoryValue)}
                </span>
              </div>
              <IconButton size="small">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50px",
                    border: "1px solid #727272",
                    padding: "2px",
                  }}
                  onClick={() => removeFile(index)}
                />
              </IconButton>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CustomFileUpload;
