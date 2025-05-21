/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import * as dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback } from "react";
const CalendarIcon = require("../../../../assets/images/png/calendar.png");

interface ICutomDatePickerProps {
  value: string | number | any;
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

const CustomDatePicker: React.FC<ICutomDatePickerProps> = ({
  value,
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
  const handleChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      onChange?.(date);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["StaticDatePicker"]}>
          <DemoItem>
            <DatePicker
              defaultValue={dayjs(value)}
              onChange={handleChange}
              disabled={disabled}
              readOnly={readOnly}
              minDate={dayjs(new Date())}
              slots={{
                openPickerIcon: CustomCalendarIcon,
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
