/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from "react";
import { useState } from "react";
import styles from "./CustomFileUpload.module.scss";
const uploadImage = require("../../../../assets/images/png/upload.png");

const CustomFileUpload = () => {
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
    console.log("Selected files:", files);
    // Upload logic here...
  };

  return (
    <div className={styles.file_upload_wrapper}>
      <label
        htmlFor="file-upload"
        className={`${styles.file_upload_box} ${isDragging ? "dragging" : ""}`}
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
  );
};

export default CustomFileUpload;
