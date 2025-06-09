/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { SPLists } from "../../Config/config";
import {
  ICountriesDetails,
  IObligationDetails,
  IProjectDetails,
} from "../../Interface/ModulesInterface";
import { setPopupResponseFun } from "../../Utils/togglePopup";
import SpServices from "../SPServices/SpServices";

const fetchOblicationData = async (
  setMasterState: any,
  setLocalState: any,
  projectId: number,
  setLoader: any
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
      Orderby: "ID",
      Orderbydecorasc: false,
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
    setLoader(false);
  } catch (err) {
    console.log("Error : ", err);
  }
};

const submitObligationForm = (
  formDetails: any,
  setMasterProjectDatas: any,
  setProjectDatas: any,
  countryDetails: ICountriesDetails,
  projectDetails: IProjectDetails,
  setPopupResponse: any,
  index: number
) => {
  const payloadDetails = {
    Title: formDetails?.Title?.value,
    Description: formDetails?.Description?.value,
    ObligationType: formDetails?.ObligationType?.value,
    Priority: formDetails?.Priority?.value,
    Status: formDetails?.Status?.value,
    Party: formDetails?.Party?.value,
    Clause: formDetails?.Clause?.value,
    StartDate: formDetails?.StartDate?.value,
    // DueDate: formDetails?.DueDate?.value,
    Remarks: formDetails?.Remarks?.value,
    ProjectOfId: projectDetails?.Id,
  };
  SpServices.SPAddItem({
    Listname: SPLists.Obligationlist,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
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
        DueDate: formDetails?.DueDate?.value,
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
        "Success!",
        "New contractual obligation have been added successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
const updateObligationForm = (
  formDetails: any,
  isUpdateDetails: any,
  setMasterState: any,
  setLocalState: any,
  countryDetails: ICountriesDetails,
  projectDetails: IProjectDetails,
  setPopupResponse: any,
  index: number
) => {
  const recId = isUpdateDetails?.Id;
  const payloadDetails = {
    Title: formDetails?.Title?.value,
    Description: formDetails?.Description?.value,
    ObligationType: formDetails?.ObligationType?.value,
    Priority: formDetails?.Priority?.value,
    Status: formDetails?.Status?.value,
    Party: formDetails?.Party?.value,
    Clause: formDetails?.Clause?.value,
    StartDate: formDetails?.StartDate?.value,
    // DueDate: formDetails?.DueDate?.value,
    Remarks: formDetails?.Remarks?.value,
    ProjectOfId: projectDetails?.Id,
  };
  SpServices.SPUpdateItem({
    Listname: SPLists.Obligationlist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      const obligationDetails: IObligationDetails = {
        Id: recId,
        Title: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        ObligationType: payloadDetails?.ObligationType,
        Party: payloadDetails?.Party,
        Clause: payloadDetails?.Clause,
        Priority: payloadDetails?.Priority,
        Status: payloadDetails?.Status,
        StartDate: payloadDetails?.StartDate,
        DueDate: formDetails?.DueDate?.value,
        Remarks: payloadDetails?.Remarks,
        ProjectOfId: projectDetails?.Id,
      };
      setMasterState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...obligationDetails } : item
        );
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...obligationDetails } : item
        );
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The contractual obligation have been updated successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export { fetchOblicationData, submitObligationForm, updateObligationForm };
