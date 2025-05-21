/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { useCallback } from "react";
import {
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  useTheme,
} from "@mui/material";

import "../CustomStyles.css";

interface ICutomDropDownProps {
  value: string | number | any;
  options: any[];
  onChange?: (value: string | any) => void;
  onClickFunction?: (value: boolean) => void;
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
  autoFocus?: boolean;
  onKeyDown?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      fontsize: "14px",
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) !== -1
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const CustomDropDown: React.FC<ICutomDropDownProps> = ({
  value,
  options,
  onChange,
  onClickFunction,
  placeholder = "",
  size = "MD",
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
  const theme = useTheme();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;

      const newValue = value !== "" ? value : "";
      onChange?.(newValue);
    },
    [onChange]
  );
  return (
    <div
      className={`customDropDownWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      <Select
        displayEmpty
        value={value}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <em
                style={{
                  fontStyle: "normal",
                  color: "#a2a2a2",
                  fontWeight: "300",
                }}
              >
                {placeholder}
              </em>
            );
          }

          return selected;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em style={{ fontStyle: "normal", color: "#a2a2a2" }}>Placeholder</em>
        </MenuItem>
        {options.map((name: any) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, value, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CustomDropDown;
