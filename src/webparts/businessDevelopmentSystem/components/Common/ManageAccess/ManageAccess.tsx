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
// import AddIcon from "@mui/icons-material/Add";
import { rowOnChangeFunction } from "../../../../../Utils/onChange";
import { PermissonOptions } from "../../../../../Config/dropDownOptions";
const defaultImg = require("../../../assets/images/png/trash.png");
const hoverImg = require("../../../assets/images/png/trash_active.png");
import "./ManageAccess.css";
import { rowValidateFunction } from "../../../../../Utils/validations";
import PopupSectionHeader from "../Headers/PopupSectionHeader/PopupSectionHeader";

interface IManageAccessProps {
  ManageAccess: any[];
  onChange?: (value: any[]) => void;
  showList: string;
  showSectionTitle?: boolean;
}

const ManageAccess: React.FC<IManageAccessProps> = ({
  ManageAccess,
  onChange,
  showList,
  showSectionTitle = true,
}) => {
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [manageAccessList, setManageAccessList] = useState<any[]>(
    ManageAccess || []
  );
  console.log("manageAccessList", manageAccessList);

  useEffect(() => {
    setManageAccessList(
      ManageAccess?.length !== 0
        ? ManageAccess
        : [
            {
              User: {
                value: [],
                isValid: true,
              },
              Permission: {
                value: "",
                isValid: true,
              },
            },
          ]
    );
  }, [ManageAccess]);

  const addNewRow = () => {
    const isValid = rowValidateFunction(
      manageAccessList,
      setManageAccessList,
      onchange
    );
    if (!isValid) {
      return;
    }
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
    setManageAccessList((prevRows) => [...prevRows, newRow]);
    onChange?.([...manageAccessList, newRow]);
  };

  const removeRow = (indexToRemove: number) => {
    const updatedList = manageAccessList.filter(
      (_, index) => index !== indexToRemove
    );
    setManageAccessList(updatedList);
    onChange?.(updatedList);
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <div className="justify-space-between">
        {showSectionTitle ? (
          <PopupSectionHeader Title="Manage Access" />
        ) : (
          <div />
        )}
        <DefaultButton btnType="addBtn" text="Add" onClick={addNewRow} />
      </div>
      <div>
        <div className="section-wrapper">
          <div className="two manage-access-table-header">User</div>
          <div className="three manage-access-table-header">Permission</div>
          <div className="manage-access-table-header">Action</div>
        </div>
        <div className={`manage-access-table-body-container-${showList}`}>
          {manageAccessList.map((item: any, index: number) => (
            <div
              key={index}
              className="section-wrapper padding-buttom-10"
              // style={{ width: "100%" }}
            >
              <CustomPeoplePicker
                selectedItem={item?.User?.value}
                sectionType="two"
                minHeight="38px"
                maxHeight="38px"
                personSelectionLimit={1}
                onChange={(value: any[]) => {
                  rowOnChangeFunction(
                    "User",
                    value,
                    setManageAccessList,
                    index,
                    onChange
                  );
                }}
                isValid={item?.User?.isValid}
                withLabel={false}
                mandatory={false}
                labelText=""
              />
              <CustomDropDown
                value={item?.Permission?.value || ""}
                options={PermissonOptions}
                placeholder="Select Permission"
                sectionType="three"
                onChange={(value) => {
                  rowOnChangeFunction(
                    "Permission",
                    value,
                    setManageAccessList,
                    index,
                    onChange
                  );
                }}
                isValid={item?.Permission?.isValid}
                withLabel={false}
                mandatory={false}
                labelText=""
              />
              <div>
                {manageAccessList.length > 1 && (
                  <img
                    src={rowIndex === index ? hoverImg : defaultImg}
                    alt="interactive"
                    width={15}
                    height={15}
                    style={{ cursor: "pointer" }}
                    onClick={() => removeRow(index)}
                    onMouseEnter={() => setRowIndex(index)}
                    onMouseLeave={() => setRowIndex(null)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageAccess;
