/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { SPLists } from "../../Config/config";
import { IObligationDetails } from "../../Interface/ModulesInterface";
import { togglePopupVisibility } from "../../Utils/togglePopup";
import SpServices from "../SPServices/SpServices";

const detchOblicationData = async (setMasterState: any, setLocalState: any) => {
  try {
    const tempObligations = await SpServices.SPReadItems({
      Listname: SPLists.Obligationlist,
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
  setPopupController: any,
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

export { detchOblicationData, submitObligationForm };
