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

const Events: React.FC = () => {
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };

  const [formDetails, setFormDetails] = useState({
    CountryName: {
      value: "",
      isValid: true,
    },
    TypeOfCountry: {
      value: "",
      isValid: true,
    },
    Number: {
      value: null,
      isValid: true,
    },
    SelectDate: {
      value: null,
      isValid: true,
    },
    selectedPeople: {
      value: [],
      isValid: true,
    },
    manageAccessList: {
      value: [],
      isValid: true,
    },
  });
  console.log("formDetails", formDetails);

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
          />
          <CustomDatePicker
            value={formDetails.SelectDate.value}
            sectionType="three"
            disabled={false}
            readOnly={false}
            onChange={(value: string) => {
              onChangeFunction("SelectDate", value, setFormDetails);
            }}
            isValid={formDetails.SelectDate.isValid}
          />
          <CustomPeoplePicker
            selectedItem={formDetails.selectedPeople.value}
            sectionType="three"
            personSelectionLimit={2}
            minHeight="38px"
            maxHeight="38px"
            onChange={(value: any[]) => {
              onChangeFunction("selectedPeople", value, setFormDetails);
            }}
            isValid={formDetails.selectedPeople.isValid}
          />
        </div>
        <ManageAccess
          ManageAccessList={formDetails?.manageAccessList?.value}
          onChange={(value: any) => {
            onChangeFunction("manageAccessList", value, setFormDetails);
          }}
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
    <div style={{ width: "100%", padding: "20px" }}>
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
