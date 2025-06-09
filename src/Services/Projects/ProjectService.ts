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
import { setPopupResponseFun } from "../../Utils/togglePopup";

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
  countryId: number,
  setProjectData: (data: IProjectDetails[]) => void,
  setMasterProjectData: (data: IProjectDetails[]) => void,
  setDispatch: any,
  setLoader: any
) => {
  const response = await SpServices.SPReadItems({
    Listname: SPLists.Projectslist,
    Select: "*,CountryOf/Id,CountryOf/Title",
    Expand: "CountryOf",
    Filter: [
      countryId
        ? {
            FilterKey: "CountryOfId",
            Operator: "eq",
            FilterValue: countryId,
          }
        : {},
    ],
    Orderby: "ID",
    Orderbydecorasc: false,
  }).then();

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
      BrandingPartner: project?.BrandingPartner,
      GoogleLocation: project?.BrandingPartner,
      UnitSize: project?.UnitSize,
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
  setLoader(false);
};

const submitAddProjectForm = (
  formDetails: any,
  setMasterProjectDatas: any,
  setProjectDatas: any,
  setPopupResponse: any,
  index: number,
  setDispatch: any
) => {
  const payloadDetails = {
    Title: formDetails?.ProjectName?.value,
    Description: formDetails?.Description?.value,
    ProjectType: formDetails?.ProjectType?.value,
    CountryOfId: formDetails?.CountryId?.value,
    City: formDetails?.City?.value,
    GoogleLocation: formDetails?.GoogleLocation?.value,
    BrandingPartner: formDetails?.BrandingPartner?.value,
    StartDate: formDetails?.StartDate?.value,
    EndDate: formDetails?.EndDate?.value,
    UnitSize: formDetails?.UnitSize?.value,
    Status: formDetails?.Status?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  SpServices.SPAddItem({
    Listname: SPLists.Projectslist,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      const projectDetails: IProjectDetails = {
        Id: res?.data?.Id,
        ProjectName: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        CountryName: formDetails?.Country?.value,
        CountryId: payloadDetails?.CountryOfId,
        City: payloadDetails?.City,
        BrandingPartner: payloadDetails?.BrandingPartner,
        GoogleLocation: payloadDetails?.GoogleLocation,
        ProjectType: payloadDetails?.ProjectType,
        StartDate: payloadDetails?.StartDate,
        EndDate: payloadDetails?.EndDate,
        UnitSize: payloadDetails?.UnitSize,
        Status: payloadDetails?.Status,
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };
      setMasterProjectDatas((prev: any) => {
        const updated = [projectDetails, ...prev];
        setDispatch(setProjectsData(updated));
        return updated;
      });
      setProjectDatas((prev: any) => {
        const updated = [projectDetails, ...prev];
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "New Project have been added successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
const updateProjectForm = (
  formDetails: any,
  isUpdateDetails: any,
  setMasterState: any,
  setLocalState: any,
  setPopupResponse: any,
  index: number,
  setDispatch: any
) => {
  const recId = isUpdateDetails?.Id;
  const payloadDetails = {
    Title: formDetails?.ProjectName?.value,
    Description: formDetails?.Description?.value,
    ProjectType: formDetails?.ProjectType?.value,
    CountryOfId: formDetails?.CountryId?.value,
    City: formDetails?.City?.value,
    GoogleLocation: formDetails?.GoogleLocation?.value,
    BrandingPartner: formDetails?.BrandingPartner?.value,
    StartDate: formDetails?.StartDate?.value,
    EndDate: formDetails?.EndDate?.value,
    UnitSize: formDetails?.UnitSize?.value,
    Status: formDetails?.Status?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
  };
  SpServices.SPUpdateItem({
    Listname: SPLists.Projectslist,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      const projectDetails: IProjectDetails = {
        Id: recId,
        ProjectName: payloadDetails?.Title,
        Description: payloadDetails?.Description,
        CountryName: formDetails?.Country?.value,
        CountryId: payloadDetails?.CountryOfId,
        City: payloadDetails?.City,
        BrandingPartner: payloadDetails?.BrandingPartner,
        GoogleLocation: payloadDetails?.GoogleLocation,
        ProjectType: payloadDetails?.ProjectType,
        StartDate: payloadDetails?.StartDate,
        EndDate: payloadDetails?.EndDate,
        UnitSize: payloadDetails?.UnitSize,
        Status: payloadDetails?.Status,
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
      };
      setMasterState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        );
        setDispatch(setProjectsData(updated));
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...projectDetails } : item
        );
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The Project have been updated successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export {
  getRegisteredCountries,
  submitAddProjectForm,
  fetchProjectData,
  updateProjectForm,
};
