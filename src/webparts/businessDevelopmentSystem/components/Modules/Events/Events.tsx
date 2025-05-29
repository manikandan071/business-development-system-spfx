/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */

import * as React from "react";
import DefaultButton from "../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import LaunchIcon from "@mui/icons-material/Launch";
import CustomInput from "../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomDropDown from "../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import CustomDatePicker from "../../Common/CustomInputFields/CustomDatePicker/CustomDatePicket";
import CustomPeoplePicker from "../../Common/CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import { useState } from "react";
import Popup from "../../Common/Popup/Popup";
import { togglePopupVisibility } from "../../../../../Utils/togglePopup";
import PopupSectionHeader from "../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import { onChangeFunction } from "../../../../../Utils/onChange";
import { validateForm } from "../../../../../Utils/validations";
import ManageAccess from "../../Common/ManageAccess/ManageAccess";
import { tempFormDetails } from "../../../../../Config/initialStates";
import { deepClone } from "../../../../../Utils/deepClone";
import CustomFileUpload from "../../Common/CustomInputFields/CustomFileUpload/CustomFileUpload";
import CustomAutoSelect from "../../Common/CustomInputFields/CustomAutoSelect/CustomAutoSelect";

const initialPopupController = [
  {
    open: false,
    popupTitle: "",
    popupWidth: "900px",
    popupType: "custom",
    defaultCloseBtn: false,
    popupData: "",
  },
];

const cloneFormDetails = deepClone(tempFormDetails);

const Events: React.FC = () => {
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };

  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  console.log("formDetails", cloneFormDetails, formDetails);

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails.CountryName.value}
            type="text"
            placeholder="Country Name"
            sectionType="three"
            onChange={(value: string) => {
              onChangeFunction("CountryName", value, setFormDetails);
            }}
            isValid={formDetails.CountryName.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
            readOnly={true}
            disabled={false}
          />
          <CustomDropDown
            options={[
              "Oliver Hansen",
              "Van Henry",
              "April Tucker",
              "Ralph Hubbard",
              "Omar Alexander",
              "Carlos Abbott",
              "Miriam Wagner",
              "Bradley Wilkerson",
              "Virginia Andrews",
              "Kelly Snyder",
            ]}
            value={formDetails.TypeOfCountry.value}
            placeholder="Type of Country"
            sectionType="three"
            onChange={(value: string) => {
              onChangeFunction("TypeOfCountry", value, setFormDetails);
            }}
            isValid={formDetails.TypeOfCountry.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
            disabled={false}
            readOnly={true}
          />
          <CustomInput
            value={formDetails.Number.value}
            type="number"
            placeholder="Country Name"
            sectionType="three"
            onChange={(value: string) => {
              onChangeFunction("Number", value, setFormDetails);
            }}
            isValid={formDetails.Number.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
          />
          <CustomDatePicker
            value={formDetails.SelectDate.value}
            sectionType="three"
            placeholder="Select Date"
            disabled={false}
            readOnly={false}
            onChange={(value: string) => {
              onChangeFunction("SelectDate", value, setFormDetails);
            }}
            isValid={formDetails.SelectDate.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
          />
          <CustomPeoplePicker
            selectedItem={formDetails.selectedPeople.value}
            sectionType="three"
            personSelectionLimit={1}
            minHeight="38px"
            maxHeight="38px"
            onChange={(value: any[]) => {
              onChangeFunction("selectedPeople", value, setFormDetails);
            }}
            isValid={formDetails.selectedPeople.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
          />
          <CustomAutoSelect
            value={formDetails.AutoSelect.value}
            options={[
              { Text: "Oliver Hansen", Id: 1 },
              { Text: "Van Henry", Id: 2 },
              { Text: "April Tucker", Id: 3 },
              { Text: "Ralph Hubbard", Id: 4 },
              { Text: "Omar Alexander", Id: 5 },
              { Text: "Carlos Abbott", Id: 6 },
              { Text: "Miriam Wagner", Id: 7 },
              { Text: "Bradley Wilkerson", Id: 8 },
              { Text: "Virginia Andrews", Id: 9 },
              { Text: "Kelly Snyder", Id: 10 },
            ]}
            onChange={async (value: { Text: string; Id: number } | null) => {
              onChangeFunction("AutoSelect", value, setFormDetails);
              onChangeFunction("AutoSelectId", value?.Id, setFormDetails);
            }}
            placeholder="Type of Country"
            sectionType="three"
            isValid={formDetails.AutoSelect.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Label Text"
          />
          <CustomInput
            value={formDetails.AutoSelectId.value}
            type="text"
            placeholder="Country ISO Code"
            sectionType="three"
            // onChange={(value: string) => {
            //   onChangeFunction("AutoSelectId", value, setFormDetails);
            // }}
            isValid={formDetails.AutoSelectId.isValid}
            withLabel={true}
            mandatory={true}
            disabled={true}
            labelText="Label Text"
          />
        </div>
        <PopupSectionHeader Title="Attachments" />
        <div className="section-wrapper">
          <CustomFileUpload />
        </div>
        <ManageAccess
          ManageAccess={formDetails?.manageAccess?.value}
          onChange={(value: any) => {
            console.log("value", value);

            onChangeFunction("manageAccess", value, setFormDetails);
          }}
          showList="3"
          showSectionTitle={true}
        />
      </div>,
    ],
  ];

  const handleSubmitFuction = (): void => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    console.log("isFormValid", isFormValid);

    if (isFormValid) {
      console.log("Form is valid");
    }
  };

  const popupActions: any[] = [
    [
      {
        text: "Cancel",
        btnType: "closeBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          setFormDetails(deepClone(cloneFormDetails));
          handleClosePopup(0);
        },
      },
      {
        text: "Submit",
        btnType: "primaryBtn",
        disabled: false,
        endIcon: false,
        startIcon: false,
        onClick: () => {
          handleSubmitFuction();
        },
      },
    ],
  ];

  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  return (
    <div style={{ width: "100%", padding: " 15px 20px" }}>
      <DefaultButton
        btnType="primaryBtn"
        text="Add new country"
        startIcon={<AddIcon />}
        onClick={() => {
          togglePopupVisibility(
            setPopupController,
            0,
            "open",
            `Add New Country`
          );
          setFormDetails(deepClone(cloneFormDetails));
          // ApproveDefinition(definitionsData, setPopupLoaders);
        }}
      />
      <DefaultButton btnType="openBtn" text="Open" startIcon={<LaunchIcon />} />
      <DefaultButton btnType="editBtn" text="Edit" startIcon={<LaunchIcon />} />
      <DefaultButton btnType="addBtn" text="Add" startIcon={<AddIcon />} />
      <DefaultButton btnType="closeBtn" text="Close" />
      <DefaultButton btnType="primaryBtn" text="Submit" />
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <CustomInput
          value="Sample"
          type="text"
          placeholder="Country Name"
          sectionType="three"
        />
        <CustomDropDown
          options={[
            "Oliver Hansen",
            "Van Henry",
            "April Tucker",
            "Ralph Hubbard",
            "Omar Alexander",
            "Carlos Abbott",
            "Miriam Wagner",
            "Bradley Wilkerson",
            "Virginia Andrews",
            "Kelly Snyder",
          ]}
          value="Oliver Hansen"
          placeholder="Country Name"
          sectionType="three"
        />
        <CustomDatePicker
          value="25-05-2025"
          sectionType="three"
          disabled={false}
          readOnly={false}
        />
      </div>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <CustomInput
          value="Notes"
          type="text"
          placeholder="Country Name"
          sectionType="two"
          rows={3}
        />
        <CustomPeoplePicker
          sectionType="two"
          personSelectionLimit={10}
          minHeight="85px"
          maxHeight="85px"
        />
        <CustomFileUpload />
      </div>

      {popupController?.map((popupData: any, index: number) => (
        <Popup
          key={index}
          isLoading={false}
          PopupType={popupData.popupType}
          onHide={() =>
            togglePopupVisibility(setPopupController, index, "close")
          }
          popupTitle={
            popupData.popupType !== "confimation" && popupData.popupTitle
          }
          popupActions={popupActions[index]}
          visibility={popupData.open}
          content={popupInputs[index]}
          popupWidth={popupData.popupWidth}
          defaultCloseBtn={popupData.defaultCloseBtn || false}
          confirmationTitle={
            popupData.popupType !== "custom" ? popupData.popupTitle : ""
          }
        />
      ))}
    </div>
  );
};

export default Events;
