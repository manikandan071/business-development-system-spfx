import * as React from "react";

interface CustomInputLabelProps {
  htmlFor?: string;
  labelText: string;
  mandatory: boolean;
}
import "../CustomStyles.css";

const CustomInputLabel: React.FC<CustomInputLabelProps> = ({
  htmlFor,
  labelText,
  mandatory = true,
}) => (
  <label className="input-label-text" htmlFor={htmlFor}>
    {labelText}
    <strong style={{ color: "red", marginLeft: "3px" }}>
      {mandatory && "*"}
    </strong>
  </label>
);

export default CustomInputLabel;
