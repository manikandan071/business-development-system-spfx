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
import CustomInputLabel from "../CustomInputFields/CustomInputLabel/CustomInputLabel";
import { Checkbox } from "primereact/checkbox";

interface IManageAccessProps {
  ManageAccess: any[];
  onChange?: (value: any, isBreakeCondition: boolean) => void;
  showList: string;
  showSectionTitle?: boolean;
  showBreakCondition?: boolean;
  breakCondition?: boolean;
  ifShowManageAccess?: boolean;
}

const ManageAccess: React.FC<IManageAccessProps> = ({
  ManageAccess,
  onChange,
  showList,
  showSectionTitle = true,
  showBreakCondition = true,
  breakCondition = false,
  ifShowManageAccess = false,
}) => {
  const [rowIndex, setRowIndex] = useState<number | null>(null);
  const [manageAccessList, setManageAccessList] = useState<any[]>(
    ManageAccess || []
  );
  console.log("Manage Access", manageAccessList);
  console.log("ifShowManageAccess", ifShowManageAccess);
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
  }, [ManageAccess || manageAccessList]);

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
        isMandatory: true,
      },
      Permission: {
        value: "",
        isValid: true,
        isMandatory: true,
      },
    };
    setManageAccessList((prevRows) => [...prevRows, newRow]);
    onChange?.([...manageAccessList, newRow], false);
  };

  const removeRow = (indexToRemove: number) => {
    const updatedList = manageAccessList.filter(
      (_, index) => index !== indexToRemove
    );
    setManageAccessList(updatedList);
    onChange?.(updatedList, false);
  };
  const validateDoubleEntry = (newUserArray: any, currentIndex: number) => {
    console.log("Verify Data", newUserArray);
    const newUser = newUserArray?.[0];
    if (!newUser) return true;
    const isDuplicate = manageAccessList?.some(
      (entry: any, idx: number) =>
        idx !== currentIndex &&
        entry?.User?.value?.some((user: any) => user.email === newUser.email)
    );
    return !isDuplicate;
  };
  return ifShowManageAccess ? (
    <div style={{ marginTop: "10px" }}>
      <div className="justify-space-between">
        {showSectionTitle ? (
          <PopupSectionHeader Title="Manage Access" />
        ) : (
          <div />
        )}
        <DefaultButton btnType="addBtn" text="Add" onClick={addNewRow} />
      </div>
      {showBreakCondition && (
        <div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Checkbox
              inputId="sendReminder"
              checked={breakCondition}
              onChange={(e) => onChange?.(e.target.checked, true)}
            />
            <label htmlFor="sendReminder" style={{ fontSize: "14px" }}>
              Break Parent Permission
            </label>
          </div>
        </div>
      )}

      <div>
        <div className="section-wrapper">
          <div className="two manage-access-table-header">
            <CustomInputLabel labelText={"User"} mandatory={true} />
          </div>
          <div className="three manage-access-table-header">
            <CustomInputLabel labelText={"Permission"} mandatory={true} />
          </div>
          <div className="manage-access-table-header">Action</div>
        </div>
        <div className={`manage-access-table-body-container-${showList}`}>
          {manageAccessList?.map((item: any, index: number) => (
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
                  const validateUser = validateDoubleEntry(value, index);
                  console.log("validateUser", validateUser);

                  if (validateUser) {
                    rowOnChangeFunction(
                      "User",
                      value,
                      setManageAccessList,
                      index,
                      onChange
                    );
                  } else {
                    rowOnChangeFunction(
                      "User",
                      [],
                      setManageAccessList,
                      index,
                      onChange
                    );
                    // alert(`${value[0]?.name} aldready entered`)
                  }
                }}
                isValid={item?.User?.isValid}
                withLabel={false}
                mandatory={true}
                disabled={!breakCondition}
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
                mandatory={true}
                readOnly={!breakCondition}
                labelText=""
              />
              <div>
                {manageAccessList.length > 1 && breakCondition && (
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
  ) : (
    <div />
  );
};

export default ManageAccess;
