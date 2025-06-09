/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback, useRef, useState } from "react";
import CustomInputLabel from "../CustomInputLabel/CustomInputLabel";
import { IconButton, InputAdornment, TextField } from "@mui/material";
const CalendarIcon = require("../../../../assets/images/png/calendar.png");

interface ICutomDatePickerProps {
  value: string | number | any;
  minDate?: string | number | any;
  onChange?: (value: string | any) => void;
  onClickFunction?: (value: boolean) => void;
  type?: "text" | "number";
  placeholder?: string;
  isValid?: any;
  sectionType?: "three" | "two" | "one";
  withLabel?: boolean;
  labelText?: string;
  disabled?: boolean;
  readOnly?: any;
  mandatory?: boolean;
}

const CustomDatePicker: React.FC<ICutomDatePickerProps> = ({
  value,
  minDate,
  onChange,
  onClickFunction,
  placeholder = "",
  isValid = true,
  sectionType,
  labelText,
  withLabel,
  disabled = false,
  readOnly,
  mandatory,
}) => {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleChange = useCallback(
    (date: dayjs.Dayjs) => {
      onChange?.(date ? date.toDate() : null);
    },
    [onChange]
  );
  const CustomCalendarIcon = () => (
    <img src={CalendarIcon} alt="calendar" style={{ width: 20, height: 20 }} />
  );
  return (
    <div
      className={`customDatePickerWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      {withLabel && (
        <CustomInputLabel
          labelText={labelText ?? ""}
          mandatory={mandatory ? true : false}
        />
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DemoContainer components={[""]}> */}
        {/* <DemoItem> */}
        <DatePicker
          // placeholder={placeholder}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          defaultValue={dayjs(value)}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          minDate={minDate ? dayjs(minDate) : dayjs(new Date())}
          // slots={{
          //   openPickerIcon: CustomCalendarIcon,
          // }}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                value={value ? dayjs(value).format("DD/MM/YYYY") : ""}
                inputRef={inputRef}
                onClick={() => setOpen(true)} // open on input click
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
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
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setOpen(true)}>
                        {CustomCalendarIcon()}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={disabled}
              />
            ),
          }}
        />
        {/* </DemoItem> */}
        {/* </DemoContainer> */}
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
