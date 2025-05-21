/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
// import { InputText } from "primereact/inputtext";
import TextField from "@mui/material/TextField";
import { memo, useCallback } from "react";
import "../CustomStyles.css";

interface ICutomInputProps {
  value: string | number | any;
  onChange?: (value: string | any) => void;
  onClickFunction?: (value: boolean) => void;
  type?: "text" | "number";
  placeholder?: string;
  rows?: number;
  isValid?: any;
  errorMsg?: string;
  sectionType?: "three" | "two" | "one";
  withLabel?: boolean;
  labelText?: string;
  disabled?: boolean;
  readOnly?: any;
  mandatory?: boolean;
  autoFocus?: boolean;
  onKeyDown?: any;
}

const CustomInput: React.FC<ICutomInputProps> = ({
  value,
  onChange,
  onClickFunction,
  type = "text",
  placeholder = "",
  rows,
  isValid = true,
  errorMsg,
  sectionType,
  labelText,
  withLabel,
  disabled,
  readOnly,
  mandatory,
  autoFocus,
  onKeyDown,
}) => {
  console.log("isValid", isValid);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue =
        type === "number"
          ? parseFloat(e.target.value)
          : e.target?.value?.trimStart();
      onChange?.(newValue);
    },
    [onChange, type]
  );
  return (
    <div
      className={`customInputWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      {/* <InputText
        v-model="value1"
        readOnly={readOnly}
        autoFocus={autoFocus}
        disabled={disabled}
        onKeyDown={onKeyDown}
        value={value || ""}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        onClick={() => {
          onClickFunction && onClickFunction(true);
        }}
        size={size}
      /> */}
      <TextField
        id="outlined-basic"
        placeholder={placeholder}
        value={value || ""}
        variant="outlined"
        onChange={handleChange}
        disabled={disabled}
        type={type}
        rows={rows}
        multiline={rows ? true : false}
      />
    </div>
  );
};

export default memo(CustomInput);
