/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import CustomInputLabel from "../CustomInputLabel/CustomInputLabel";
import { Autocomplete, TextField } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";

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
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const handleChange = useCallback(
    (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
      onChange?.(newValue);
    },
    [onChange]
  );

  useEffect(() => {
    const matched =
      typeof value === "object"
        ? value
        : options.find((opt) => opt?.Value === value || opt?.Text === value) ??
          null;

    setSelectedOption(matched);
  }, [value, options]);
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
        // value={options.find((opt) => opt.Text === value)}
        // isOptionEqualToValue={(option, value) => option.Text === value}
        value={selectedOption}
        isOptionEqualToValue={(option, value) => option?.Value === value?.Value}
        sx={{ width: 300 }}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        renderInput={(params) => (
          <TextField
            {...params}
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

export default memo(CustomAutoSelect);
