/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-var-requires */

import * as React from "react";
import CustomPeoplePicker from "../CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import CustomDropDown from "../CustomInputFields/CustomDropDown/CustomDropDown";
import { useEffect, useState } from "react";
import DefaultButton from "../Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import { rowOnChangeFunction } from "../../../../../Utils/onChange";
const defaultImg = require("../../../assets/images/png/trash.png");
const hoverImg = require("../../../assets/images/png/trash_active.png");

interface IManageAccessProps {
  ManageAccessList: any[];
  onChange: (value: any[]) => void;
}

const ManageAccess: React.FC<IManageAccessProps> = ({
  ManageAccessList,
  onChange,
}) => {
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [formDetails, setFormDetails] = useState<any[]>(ManageAccessList || []);

  useEffect(() => {
    setFormDetails(ManageAccessList);
  }, [ManageAccessList]);

  const addNewRow = () => {
    const newRow = {
      User: {
        value: [],
        isValid: true,
      },
      Permission: {
        value: "",
        isValid: true,
      },
    };
    setFormDetails((prevRows) => [...prevRows, newRow]);
    onChange([...formDetails, newRow]);
  };
  return (
    <div>
      <div>
        <DefaultButton
          btnType="addBtn"
          text="Add"
          startIcon={<AddIcon />}
          onClick={addNewRow}
        />
      </div>
      <div>
        <div>
          <div>User</div>
          <div>Permission</div>
          <div>Action</div>
        </div>
        {formDetails.map((item: any, index) => (
          <div
            key={index}
            className="section-wrapper"
            // style={{ width: "100%" }}
          >
            <CustomPeoplePicker
              selectedItem={item?.User?.value || []}
              sectionType="three"
              minHeight="38px"
              maxHeight="38px"
              personSelectionLimit={1}
              onChange={(value: any[]) => {
                rowOnChangeFunction("User", value, setFormDetails, index);
              }}
              isValid={item?.User?.isValid}
            />
            <CustomDropDown
              value={item?.Permission?.value || ""}
              options={[]}
              sectionType="three"
              onChange={(value) => {
                rowOnChangeFunction("Permission", value, setFormDetails, index);
              }}
              isValid={item?.Permission?.isValid}
            />
            <div>
              <img
                src={rowIndex === index ? hoverImg : defaultImg}
                alt="interactive"
                width={30}
                height={30}
                style={{ cursor: "pointer" }}
                // onClick={onClick}
                onMouseEnter={() => setRowIndex(index)}
                onMouseLeave={() => setRowIndex(null)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAccess;
