/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { SPLists } from "../../Config/config";
import {
  IcountriesType,
  IObligationDetails,
  IProjectDetails,
} from "../../Interface/ModulesInterface";
import { setPopupResponseFun } from "../../Utils/togglePopup";
import SpServices from "../SPServices/SpServices";

const fetchOblicationData = async (
  setMasterState: any,
  setLocalState: any,
  projectId: number
) => {
  try {
    const tempObligations = await SpServices.SPReadItems({
      Listname: SPLists.Obligationlist,
      Select: "*,ProjectOf/Id,ProjectOf/Title",
      Expand: "ProjectOf",
      Filter: [
        {
          FilterKey: "ProjectOfId",
          Operator: "eq",
          FilterValue: projectId,
        },
      ],
    }).then();

    const tempArray: IObligationDetails[] = [];

    tempObligations?.map((obligation: any) => {
      const obligationDetails: IObligationDetails = {
        Id: obligation?.Id,
        Title: obligation?.Title,
        Description: obligation?.Description,
        ObligationType: obligation?.ObligationType,
        Party: obligation?.Party,
        Clause: obligation?.Clause,
        Priority: obligation?.Priority,
        Status: obligation?.Status,
        StartDate: obligation?.StartDate,
        DueDate: obligation?.DueDate,
        Remarks: obligation?.Remarks,
        ProjectOfId: obligation?.ProjectOfId,
      };
      tempArray.push(obligationDetails);
    });
    setMasterState(tempArray);
    setLocalState(tempArray);
  } catch (err) {
    console.log("Error : ", err);
  }
};

const submitObligationForm = (
  formDetails: any,
  setMasterProjectDatas: any,
  setProjectDatas: any,
  countryDetails: IcountriesType,
  projectDetails: IProjectDetails,
  setPopupResponse: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    Title: formDetails?.Title?.value,
    Description: formDetails?.Description?.value,
    ObligationType: formDetails?.ObligationType?.value,
    Priority: formDetails?.Priority?.value,
    Status: formDetails?.Status?.value,
    Party: formDetails?.Party?.value,
    Clause: formDetails?.Clause?.value,
    StartDate: formDetails?.StartDate?.value,
    DueDate: formDetails?.DueDate?.value,
    Remarks: formDetails?.Remarks?.value,
    ProjectOfId: projectDetails?.Id,
  };
  debugger;
  SpServices.SPAddItem({
    Listname: SPLists.Obligationlist,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const obligationDetails: IObligationDetails = {
        Id: res?.data?.Id,
        Title: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        ObligationType: payloadDetails?.ObligationType,
        Party: payloadDetails?.Party,
        Clause: payloadDetails?.Clause,
        Priority: payloadDetails?.Priority,
        Status: payloadDetails?.Status,
        StartDate: payloadDetails?.StartDate,
        DueDate: payloadDetails?.DueDate,
        Remarks: payloadDetails?.Remarks,
        ProjectOfId: projectDetails?.Id,
      };
      setMasterProjectDatas((prev: any) => {
        return [obligationDetails, ...prev];
      });
      setProjectDatas((prev: any) => {
        return [obligationDetails, ...prev];
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Form Submission!",
        "Contractual obligation form have been added successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export { fetchOblicationData, submitObligationForm };
