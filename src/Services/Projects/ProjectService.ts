/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { SPLists } from "../../Config/config";
import SpServices from "../SPServices/SpServices";
import {
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  manageAccessUsersSerialized,
} from "../CommonService/CommonService";
import { IProjectDetails } from "../../Interface/ModulesInterface";
import { setProjectsData } from "../../Redux/Features/ProjectContextSlice";
import { togglePopupVisibility } from "../../Utils/togglePopup";

const getRegisteredCountries = async (setRegisteredCountries: any) => {
  await SpServices.SPReadItems({ Listname: SPLists.Countrieslist }).then(
    (res: any) => {
      const tempCoiuntriesList = res?.map((country: any) => {
        return {
          Id: country?.Id,
          CountryName: country?.Title,
        };
      });
      setRegisteredCountries([...tempCoiuntriesList]);
    }
  );
};

const fetchProjectData = async (
  setProjectData: (data: IProjectDetails[]) => void,
  setMasterProjectData: (data: IProjectDetails[]) => void,
  setDispatch: any
) => {
  const response = await SpServices.SPReadItems({
    Listname: SPLists.Projectslist,
    Select: "*,CountryOf/Id,CountryOf/Title",
    Expand: "CountryOf",
    Orderby: "Id",
    Orderbydecorasc: "dec",
  }).then();
  console.log("response", response);

  const tempArray: IProjectDetails[] = response.map((project: any) => {
    // Transform ManageAccess to match IUserDetails[]
    // const deserializedAccess = manageAccessUsersDeserialized(
    //   project?.ManageAccess
    // );
    // const manageAccess: any[] = Array.isArray(deserializedAccess)
    //   ? deserializedAccess.map((user: any) => ({
    //       Id: user?.Id,
    //       Email: user?.Email,
    //       DisplayName: user?.DisplayName,
    //     }))
    //   : [];

    return {
      Id: project?.Id,
      ProjectName: project?.Title,
      Description: project?.Description,
      CountryName: project?.CountryOf.Title,
      CountryId: project?.CountryOf?.Id,
      City: project?.City,
      ProjectType: project?.ProjectType,
      StartDate: project?.StartDate,
      EndDate: project?.EndDate,
      Status: project?.Status,
      ManageAccess: manageAccessUsersDeserialized(project?.ManageAccess),
      ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
        project?.ManageAccess
      ),
    };
  });
  setProjectData([...tempArray]);
  setMasterProjectData([...tempArray]);
  setDispatch(setProjectsData([...tempArray]));
};

const submitAddProjectForm = (
  formDetails: any,
  setMasterProjectDatas: any,
  setProjectDatas: any,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    Title: formDetails?.ProjectName?.value,
    Description: formDetails?.Description?.value,
    ProjectType: formDetails?.ProjectType?.value,
    CountryOfId: formDetails?.CountryId?.value,
    City: formDetails?.City?.value,
    StartDate: formDetails?.StartDate?.value,
    EndDate: formDetails?.EndDate?.value,
    Status: "Not Started",
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  debugger;
  SpServices.SPAddItem({
    Listname: SPLists.Projectslist,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const projectDetails = {
        Id: res?.data?.Id,
        ProjectName: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        CountryName: formDetails?.Country?.value,
        CountryId: payloadDetails?.CountryOfId,
        City: payloadDetails?.City,
        ProjectType: payloadDetails?.ProjectType,
        StartDate: payloadDetails?.StartDate,
        EndDate: payloadDetails?.EndDate,
        Status: "Not Started",
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };
      setMasterProjectDatas((prev: any) => {
        return [projectDetails, ...prev];
      });
      setProjectDatas((prev: any) => {
        return [projectDetails, ...prev];
      });
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
const submitManageAccessForm = (
  formDetails: any,
  recId: number,
  setMasterState: any,
  setLocalState: any,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  debugger;
  SpServices.SPUpdateItem({
    Listname: SPLists.Projectslist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const projectDetails = {
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };

      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        )
      );
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export {
  getRegisteredCountries,
  submitAddProjectForm,
  fetchProjectData,
  submitManageAccessForm,
};
