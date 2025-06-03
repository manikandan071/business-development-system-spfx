/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { SPLists } from "../../Config/config";
import {
  ICalenderDetails,
  IcountriesType,
  IProjectDetails,
} from "../../Interface/ModulesInterface";
import { togglePopupVisibility } from "../../Utils/togglePopup";
import { peopleHandler } from "../CommonService/CommonService";
import SpServices from "../SPServices/SpServices";

const fetchCalenderData = async (
  setMasterState: any,
  setLocalState: any,
  projectId: number
) => {
  try {
    const tempCalenders = await SpServices.SPReadItems({
      Listname: SPLists.Calenderlist,
      Select:
        "*,AssignedTo/ID,AssignedTo/Title,AssignedTo/EMail,ProjectOf/Id,ProjectOf/Title",
      Expand: "AssignedTo,ProjectOf",
      Filter: [
        {
          FilterKey: "ProjectOfId",
          Operator: "eq",
          FilterValue: projectId,
        },
      ],
    }).then();

    const tempArray: ICalenderDetails[] = [];

    tempCalenders?.map((calender: any) => {
      const obligationDetails: ICalenderDetails = {
        Id: calender?.Id,
        EventTitle: calender?.Title,
        Description: calender?.Description ? calender?.Description : "",
        EventType: calender?.EventType,
        Category: calender?.Category,
        Location: calender?.Location,
        Status: calender?.Status,
        EventDateTime: calender?.EventDateTime,
        AssignedTo: peopleHandler(calender?.AssignedTo),
        ProjectOfId: calender?.ProjectOfId,
      };
      tempArray.push(obligationDetails);
    });
    setMasterState(tempArray);
    setLocalState(tempArray);
  } catch (err) {
    console.log("Error : ", err);
  }
};

const submitCalenderForm = (
  formDetails: any,
  setMasterProjectDatas: any,
  setProjectDatas: any,
  countryDetails: IcountriesType,
  projectDetails: IProjectDetails,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    Title: formDetails?.EventTitle?.value,
    Description: formDetails?.Description?.value,
    EventType: formDetails?.EventType?.value,
    Category: formDetails?.Category?.value,
    Status: formDetails?.Status?.value,
    Location: formDetails?.Location?.value,
    EventDateTime: formDetails?.EventDateTime?.value,
    AssignedToId: {
      results: formDetails?.AssignedTo?.value?.map(
        (manager: any) => manager.id
      ),
    },
    ProjectOfId: projectDetails?.Id,
  };
  debugger;
  SpServices.SPAddItem({
    Listname: SPLists.Calenderlist,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const obligationDetails: ICalenderDetails = {
        Id: res?.data?.Id,
        EventTitle: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        EventType: payloadDetails?.EventType,
        Category: payloadDetails?.Category,
        Location: payloadDetails?.Location,
        EventDateTime: payloadDetails?.EventDateTime,
        Status: payloadDetails?.Status,
        AssignedTo: formDetails?.AssignedTo?.value,
        ProjectOfId: projectDetails?.Id,
      };
      setMasterProjectDatas((prev: any) => {
        return [obligationDetails, ...prev];
      });
      setProjectDatas((prev: any) => {
        return [obligationDetails, ...prev];
      });
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
const updateCalenderDorm = (
  formDetails: any,
  isUpdateDetails: any,
  setMasterState: any,
  setLocalState: any,
  countryDetails: IcountriesType,
  projectDetails: IProjectDetails,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const recId = isUpdateDetails?.Id;
  const payloadDetails = {
    Title: formDetails?.EventTitle?.value,
    Description: formDetails?.Description?.value,
    EventType: formDetails?.EventType?.value,
    Category: formDetails?.Category?.value,
    Status: formDetails?.Status?.value,
    Location: formDetails?.Location?.value,
    EventDateTime: formDetails?.EventDateTime?.value,
    AssignedToId: {
      results: formDetails?.AssignedTo?.value?.map(
        (manager: any) => manager.ID
      ),
    },
  };
  debugger;
  SpServices.SPUpdateItem({
    Listname: SPLists.Calenderlist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const calenderDetails: ICalenderDetails = {
        Id: recId,
        EventTitle: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        EventType: payloadDetails?.EventType,
        Category: payloadDetails?.Category,
        Location: payloadDetails?.Location,
        EventDateTime: payloadDetails?.EventDateTime,
        Status: payloadDetails?.Status,
        AssignedTo: formDetails?.AssignedTo?.value,
        ProjectOfId: projectDetails?.Id,
      };
      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.Id === parseFloat(recId) ? { ...item, ...calenderDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...calenderDetails } : item
        )
      );
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export { fetchCalenderData, submitCalenderForm, updateCalenderDorm };
