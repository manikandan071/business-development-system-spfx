/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import CustomInputLabel from "../CustomInputLabel/CustomInputLabel";
import { Autocomplete, TextField } from "@mui/material";
import { useCallback } from "react";

interface ICutomAutoSelectProps {
  value: string | number | any;
  options: any[];
  onChange?: (value: string | any) => void;
  type?: "text" | "number";
  placeholder?: string;
  size?: "SM" | "MD" | "XL";
  isValid?: any;
  errorMsg?: string;
  sectionType?: "three" | "two" | "one";
  withLabel?: boolean;
  labelText?: string;
  disabled?: boolean;
  readOnly?: any;
  mandatory?: boolean;
}

const CustomAutoSelect: React.FC<ICutomAutoSelectProps> = ({
  value,
  options,
  onChange,
  placeholder = "",
  isValid = true,
  sectionType,
  labelText,
  withLabel,
  disabled = false,
  readOnly,
  mandatory,
}) => {
  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      console.log("newValue", newValue);
      onChange?.(newValue);
    },
    [onChange]
  );
  return (
    <div
      className={`customAutoSelectWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      {withLabel && (
        <CustomInputLabel
          labelText={labelText ?? ""}
          mandatory={mandatory ? true : false}
        />
      )}
      <Autocomplete
        disablePortal
        options={options}
        getOptionLabel={(option) => option.Text}
        sx={{ width: 300 }}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            placeholder={placeholder}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                fontWeight: "300",
                fontStyle: "normal",
                fontSize: "14px",
                fontFamily: "var(--font-family-main) !important",
                color: "var(--input-placeholder-font-color)",
                opacity: 1,
              },
              "& .MuiInputBase-input": {
                fontFamily: "var(--font-family-main) !important",
                cursor: "pointer",
              },
            }}
          />
        )}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomAutoSelect;
