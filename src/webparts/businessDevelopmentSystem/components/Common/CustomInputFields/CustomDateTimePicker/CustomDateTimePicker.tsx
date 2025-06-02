/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import * as dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useCallback, useState } from "react";
import CustomInputLabel from "../CustomInputLabel/CustomInputLabel";
import { IconButton, InputAdornment } from "@mui/material";

const CalendarIcon = require("../../../../assets/images/png/calendar.png");

interface ICutomDateTimePickerProps {
  value: string | number | any;
  minDate?: string | number | any;
  onChange?: (value: string | any) => void;
  placeholder?: string;
  isValid?: boolean;
  sectionType?: "three" | "two" | "one";
  withLabel?: boolean;
  labelText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  mandatory?: boolean;
}

const CustomDateTimePicker: React.FC<ICutomDateTimePickerProps> = ({
  value,
  minDate,
  onChange,
  placeholder = "Select date and time",
  isValid = true,
  sectionType,
  labelText,
  withLabel,
  disabled = false,
  readOnly = false,
  mandatory = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      onChange?.(date ? date.toDate() : null);
    },
    [onChange]
  );

  const CustomCalendarIcon = () => (
    <img src={CalendarIcon} alt="calendar" style={{ width: 20, height: 20 }} />
  );

  return (
    <div
      className={`customDatePickerWrapper customDateAndTimeWrapper ${sectionType} ${
        isValid ? "" : "sectionError"
      }`}
    >
      {withLabel && (
        <CustomInputLabel labelText={labelText ?? ""} mandatory={mandatory} />
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={value ? dayjs(value) : null}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          minDate={minDate ? dayjs(minDate) : dayjs()}
          slotProps={{
            textField: {
              placeholder,
              onClick: () => setOpen(true),
              inputProps: {
                readOnly: true,
              },
              sx: {
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
              },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setOpen(true)}>
                      {CustomCalendarIcon()}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            },
            popper: {
              disablePortal: true,
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 8], // adjust popup position slightly below input
                  },
                },
              ],
            },
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDateTimePicker;
