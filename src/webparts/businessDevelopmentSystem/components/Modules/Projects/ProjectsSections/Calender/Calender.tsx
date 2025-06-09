/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calender.module.scss";
import "./Calender.css";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";
import {
  setPopupResponseFun,
  togglePopupVisibility,
} from "../../../../../../../Utils/togglePopup";
import Popup from "../../../../Common/Popup/Popup";
import { useEffect, useState } from "react";
import { deepClone } from "../../../../../../../Utils/deepClone";
import {
  ICalenderDetails,
  ICountriesDetails,
  IProjectDetails,
} from "../../../../../../../Interface/ModulesInterface";
import { CalenderFormDetails } from "../../../../../../../Config/initialStates";
import PopupSectionHeader from "../../../../Common/Headers/PopupSectionHeader/PopupSectionHeader";
import { onChangeFunction } from "../../../../../../../Utils/onChange";
import CustomInput from "../../../../Common/CustomInputFields/CustomInput/CustomInput";
import CustomDropDown from "../../../../Common/CustomInputFields/CustomDropDown/CustomDropDown";
import { validateForm } from "../../../../../../../Utils/validations";
import CustomDateTimePicker from "../../../../Common/CustomInputFields/CustomDateTimePicker/CustomDateTimePicker";
import {
  EventCategoryOptions,
  EventStatusOptions,
  EventTypeOptions,
} from "../../../../../../../Config/dropDownOptions";
import CustomPeoplePicker from "../../../../Common/CustomInputFields/CustomPeoplePicker/CustomPeoplePicker";
import {
  fetchCalenderData,
  submitCalenderForm,
  updateCalenderDorm,
} from "../../../../../../../Services/Calender/CalenderService";
import AppLoader from "../../../../Common/AppLoader/AppLoader";

interface ICalendersProps {
  countryDetails: ICountriesDetails;
  projectDetails: IProjectDetails;
}

const Calender: React.FC<ICalendersProps> = ({
  countryDetails,
  projectDetails,
}) => {
  const cloneFormDetails = deepClone(CalenderFormDetails);
  const handleClosePopup = (index?: any): void => {
    togglePopupVisibility(setPopupController, index, "close");
  };
  const initialPopupController = [
    {
      open: false,
      popupTitle: "",
      popupWidth: "50%",
      popupType: "custom",
      defaultCloseBtn: false,
      popupData: "",
    },
  ];
  const initialPopupResponse = [
    {
      Loading: false,
      Title: "",
      Message: "",
    },
  ];
  const [popupController, setPopupController] = useState(
    initialPopupController
  );
  const [popupResponse, setPopupResponse] = useState(initialPopupResponse);
  const [masterCalenderData, setMasterCalenderData] = useState<
    ICalenderDetails[]
  >([]);
  const [calenderData, setCalenderData] = useState<ICalenderDetails[]>([]);
  const [formDetails, setFormDetails] = useState(deepClone(cloneFormDetails));
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isUpdateDetails, setIsUpdateDetails] = useState<any>({
    Id: null,
    Type: "",
  });
  console.log("masterCalenderData", masterCalenderData);

  // const events = [
  //   {
  //     title: "Team meeting Team meeting Team meeting Team meeting",
  //     date: "2025-05-18T09:00:00",
  //   },
  //   { title: "Internal discussion", date: "2025-05-18T13:00:00" },
  //   { title: "Follow-up", date: "2025-05-18T15:00:00" },
  //   { title: "Another Task", date: "2025-05-18T17:00:00" },
  //   {
  //     title: "Team meeting Team meeting Team meeting Team meeting",
  //     date: "2025-05-15T09:00:00",
  //   },
  //   { title: "Internal discussion", date: "2025-05-15T13:00:00" },
  //   { title: "Follow-up", date: "2025-05-10T15:00:00" },
  //   { title: "Another Task", date: "2025-05-10T17:00:00" },
  // ];

  const popupInputs: any[] = [
    [
      <div key={0} style={{ width: "100%" }}>
        <PopupSectionHeader Title="Basic Details" />
        <div className="section-wrapper">
          <CustomInput
            value={formDetails?.EventTitle?.value}
            type="text"
            placeholder="Enter event name"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("EventTitle", value, setFormDetails);
            }}
            isValid={formDetails?.EventTitle?.isValid}
            withLabel={true}
            mandatory={formDetails?.EventTitle?.isMandatory}
            labelText="Event name"
          />
          <CustomDropDown
            options={EventTypeOptions}
            value={formDetails?.EventType?.value}
            placeholder="Select event type"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("EventType", value, setFormDetails);
            }}
            isValid={formDetails?.EventType?.isValid}
            withLabel={true}
            mandatory={formDetails?.EventType?.isMandatory}
            labelText="Event type"
          />
          <CustomDropDown
            options={EventCategoryOptions}
            value={formDetails?.Category?.value}
            placeholder="Select category"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Category", value, setFormDetails);
            }}
            isValid={formDetails?.Category?.isValid}
            withLabel={true}
            mandatory={formDetails?.Category?.isMandatory}
            labelText="Category"
          />
          <CustomDateTimePicker
            value={formDetails?.EventDateTime?.value}
            sectionType="two"
            placeholder="Select date time"
            onChange={(value: string) => {
              onChangeFunction("EventDateTime", value, setFormDetails);
            }}
            isValid={formDetails?.EventDateTime?.isValid}
            withLabel={true}
            mandatory={formDetails?.EventDateTime?.isMandatory}
            labelText="Date & time"
          />
          <CustomInput
            value={formDetails?.Location?.value}
            type="text"
            placeholder="Enter location"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Location", value, setFormDetails);
            }}
            isValid={formDetails?.Location?.isValid}
            withLabel={true}
            mandatory={formDetails?.Location?.isMandatory}
            labelText="Location"
          />
          <CustomPeoplePicker
            selectedItem={formDetails.AssignedTo.value}
            sectionType="two"
            placeholder="Select user"
            personSelectionLimit={1}
            minHeight="38px"
            maxHeight="38px"
            onChange={(value: any[]) => {
              onChangeFunction("AssignedTo", value, setFormDetails);
            }}
            isValid={formDetails.AssignedTo.isValid}
            withLabel={true}
            mandatory={true}
            labelText="Assign to"
          />
          <CustomInput
            value={formDetails?.Description?.value}
            type="text"
            placeholder="Enter any notes"
            rows={3}
            sectionType="one"
            onChange={(value: string) => {
              onChangeFunction("Description", value, setFormDetails);
            }}
            isValid={formDetails?.Description?.isValid}
            withLabel={true}
            mandatory={formDetails?.Description?.isMandatory}
            labelText="Notes"
          />
          <CustomDropDown
            options={EventStatusOptions}
            value={formDetails?.Status?.value}
            placeholder="Select status"
            sectionType="two"
            onChange={(value: string) => {
              onChangeFunction("Status", value, setFormDetails);
            }}
            isValid={formDetails?.Status?.isValid}
            withLabel={true}
            mandatory={formDetails?.Status?.isMandatory}
            labelText="Status"
          />
        </div>
      </div>,
    ],
  ];

  const handleSubmitFuction = async (): Promise<void> => {
    const isFormValid = validateForm(formDetails, setFormDetails);
    if (isFormValid) {
      setPopupResponseFun(setPopupResponse, 0, true, "", "");
      if (isUpdateDetails?.Type === "New") {
        submitCalenderForm(
          formDetails,
          setMasterCalenderData,
          setCalenderData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      } else {
        updateCalenderDorm(
          formDetails,
          isUpdateDetails,
          setMasterCalenderData,
          setCalenderData,
          countryDetails,
          projectDetails,
          setPopupResponse,
          0
        );
      }
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
          setPopupResponseFun(setPopupResponse, 0, false, "", "");
        },
      },
      {
        text: isUpdateDetails?.Type === "New" ? "Submit" : "Update",
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

  const handleEventClick = (
    info: import("@fullcalendar/core").EventClickArg
  ) => {
    const selectedEvent = info.event;
    setFormDetails({
      EventTitle: {
        value: selectedEvent.title,
        isValid: true,
        isMandatory: true,
      },
      Description: {
        value: selectedEvent?.extendedProps?.Description,
        isValid: true,
        isMandatory: false,
      },
      EventType: {
        value: selectedEvent?.extendedProps?.EventType,
        isValid: true,
        isMandatory: true,
      },
      Category: {
        value: selectedEvent?.extendedProps?.Category,
        isValid: true,
        isMandatory: true,
      },
      Status: {
        value: selectedEvent?.extendedProps?.Status,
        isValid: true,
        isMandatory: true,
      },
      EventDateTime: {
        value: selectedEvent?.start,
        isValid: true,
        isMandatory: true,
      },
      Location: {
        value: selectedEvent?.extendedProps?.Location,
        isValid: true,
        isMandatory: true,
      },
      AssignedTo: {
        value: selectedEvent?.extendedProps?.AssignedTo,
        isValid: true,
        isMandatory: true,
      },
    });
    togglePopupVisibility(
      setPopupController,
      0,
      "open",
      `Update Critical Date`
    );
    setIsUpdateDetails({
      Id: parseInt(selectedEvent?.id),
      Type: "Update",
    });
  };

  useEffect(() => {
    fetchCalenderData(
      setMasterCalenderData,
      setCalenderData,
      projectDetails?.Id,
      setIsLoader
    );
  }, []);

  const mappedEvents = calenderData.map((item: any) => ({
    id: item.Id,
    title: item.EventTitle,
    date: item.EventDateTime, // make sure this is a valid ISO string or JS Date
    extendedProps: {
      Description: item.Description,
      EventType: item.EventType,
      Category: item.Category,
      Location: item.Location,
      Status: item.Status,
      AssignedTo: item.AssignedTo,
    },
  }));

  return isLoader ? (
    <AppLoader />
  ) : (
    <div className={styles.Calender_wrapper}>
      <div className="justify-end gap-10">
        <DefaultButton
          btnType="primaryBtn"
          text="Add Critical Date"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsUpdateDetails({
              Id: null,
              Type: "New",
            });
            togglePopupVisibility(
              setPopupController,
              0,
              "open",
              `Add Critical Date`
            );
            setFormDetails(deepClone(cloneFormDetails));
          }}
        />
      </div>
      <div className={styles.Calender_main}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={mappedEvents}
          eventClick={handleEventClick}
          dayMaxEvents={2}
          height="auto"
          firstDay={1}
        />
      </div>
      <div>
        {popupController?.map((popupData: any, index: number) => (
          <Popup
            key={index}
            isLoading={false}
            PopupType={popupData.popupType}
            onHide={() => {
              togglePopupVisibility(setPopupController, index, "close");
              setPopupResponseFun(setPopupResponse, index, false, "", "");
            }}
            popupTitle={
              popupData.popupType !== "confimation" && popupData.popupTitle
            }
            popupActions={popupActions[index]}
            response={popupResponse[index]}
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
    </div>
  );
};

export default Calender;
