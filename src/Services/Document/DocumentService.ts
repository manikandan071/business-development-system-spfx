/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { sp } from "@pnp/sp";
import { SPLibraries, SPLists } from "../../Config/config";
import {
  ICountriesDetails,
  IDocumentsDetails,
  IProjectDetails,
} from "../../Interface/ModulesInterface";
import { setPopupResponseFun } from "../../Utils/togglePopup";
import {
  appendCategoryToFileName,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  manageAccessUsersSerialized,
  updateDocumentMAUsers,
} from "../CommonService/CommonService";
import SpServices from "../SPServices/SpServices";
import { FileItem } from "../../Interface/CommonInterface";

const getLibraryAttachments = async (
  country: string,
  project: string,
  category: string
): Promise<FileItem[]> => {
  try {
    const folderPath = `${
      SPLibraries.ProjectDocuments
    }/${country.trimEnd()}/${project.trimEnd()}/${category.trimEnd()}`;

    const folder = sp.web.getFolderByServerRelativeUrl(folderPath);
    const files = await folder.files();

    const mapped: FileItem[] = files.map((file: any) => ({
      name: file.Name,
      file: file, // No File object available at this point
      uploaded: true,
      serverRelativeUrl: file.ServerRelativeUrl,
    }));

    return mapped;
  } catch (err) {
    console.error("Error fetching attachments:", err);
    return [];
  }
};

const fetchDocumentsData = async (
  setMasterState: any,
  setLocalState: any,
  projectId: number,
  setLoader: any
) => {
  try {
    const tempDocuments = await SpServices.SPReadItems({
      Listname: SPLists.DocumentsList,
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
     
    const tempArray: IDocumentsDetails[] = tempDocuments?.map((document: any) => {
      console.log("Document Data",document)
      return {
        Id: document?.Id,
        Category: document?.Category,
        ContractType: document?.ContractType,
        Party: document?.Party,
        Date: document?.Date,
        ManageAccess: manageAccessUsersDeserialized(document?.ManageAccess),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          document?.ManageAccess
        ),
        ProjectOfId: document?.ProjectOfId,
       BreakPermission: document?.IsBreakParentPermission || false,
      };
    });
    setMasterState([...tempArray]);
    setLocalState([...tempArray]);
    setLoader(false);
  } catch (err) {
    console.log("Error : ", err);
  }
};

const createFolderIfNotExists = async (folderPath: string) => {
  const folderParts = folderPath.split("/");
  let currentPath = SPLibraries.ProjectDocuments;

  for (const part of folderParts) {
    const folders = await sp.web
      .getFolderByServerRelativePath(currentPath)
      .folders.select("Name")();
    if (!folders.find((f) => f.Name === part)) {
      await sp.web
        .getFolderByServerRelativePath(currentPath)
        .folders.addUsingPath(part);
    }
    currentPath += `/${part}`;
  }

  return `${sp.web.toUrl()}/${currentPath}`;
};

const submitDocumentForm = async (
  formDetails: any,
  setMasterState: any,
  setLocalState: any,
  countryDetails: ICountriesDetails,
  projectDetails: IProjectDetails,
  setPopupResponse: any,
  index: number
) => {
  debugger;
  const payloadDetails = {
    Category: formDetails?.Category?.value,
    ContractType: formDetails?.ContractType?.value,
    Party: formDetails?.Party?.value,
    Date: formDetails?.Date?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
    ProjectOfId: projectDetails?.Id,
    IsBreakParentPermission:formDetails?.BreakPermission?.value || false
  };
  await SpServices.SPAddItem({
    Listname: SPLists.DocumentsList,
    RequestJSON: payloadDetails,
  })
    .then(async (res: any) => {
      updateDocumentMAUsers(
        manageAccessUsersDeserialized(payloadDetails?.ManageAccess),
        res?.data?.Id,
        projectDetails?.Id,
        SPLists?.Projectslist,
        countryDetails?.Id,
        SPLists?.Countrieslist
      )
      const folderPath = `${countryDetails?.countryName.trimEnd()}/${projectDetails?.ProjectName.trimEnd()}/${payloadDetails?.Category.trimEnd()}`;
      const fullPath = await createFolderIfNotExists(folderPath);
      console.log("fullPath", fullPath);

      for (const fileObj of formDetails?.Attachments?.value) {
        if (!fileObj.uploaded) {
          const uploadResult = await sp.web
            .getFolderByServerRelativePath(
              `${SPLibraries.ProjectDocuments}/${folderPath}`
            )
            .files.addUsingPath(
              appendCategoryToFileName(fileObj.name, payloadDetails?.Category),
              fileObj.file
            );
          fileObj.uploaded = true;
          fileObj.serverRelativeUrl = uploadResult.data.ServerRelativeUrl;
        }
      }
      const documentDetails: IDocumentsDetails = {
        Id: res?.data?.Id,
        Category: payloadDetails?.Category,
        ContractType: payloadDetails?.ContractType,
        Party: payloadDetails?.Party,
        Date: payloadDetails?.Date,
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
        ProjectOfId: projectDetails?.Id,
        BreakPermission:payloadDetails?.IsBreakParentPermission || false
      };

      setMasterState((prev: any) => {
        return [documentDetails, ...prev];
      });
      setLocalState((prev: any) => {
        return [documentDetails, ...prev];
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "New document have been added successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
const updateDocumentForm = async (
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
    Category: formDetails?.Category?.value,
    ContractType: formDetails?.ContractType?.value,
    Party: formDetails?.Party?.value,
    Date: formDetails?.Date?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
    ProjectOfId: projectDetails?.Id,
    IsBreakParentPermission:formDetails?.BreakPermission?.value
  };
  await SpServices.SPUpdateItem({
    Listname: SPLists.DocumentsList,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then(async (res: any) => {
      console.log("res", res);
      const folderPath = `${countryDetails?.countryName.trimEnd()}/${projectDetails?.ProjectName.trimEnd()}/${payloadDetails?.Category.trimEnd()}`;
      const fullPath = await createFolderIfNotExists(folderPath);
      console.log("fullPath", fullPath);

      for (const fileObj of formDetails?.Attachments?.value) {
        if (!fileObj.uploaded) {
          const uploadResult = await sp.web
            .getFolderByServerRelativePath(
              `${SPLibraries.ProjectDocuments}/${folderPath}`
            )
            .files.addUsingPath(
              appendCategoryToFileName(fileObj.name, payloadDetails?.Category),
              fileObj.file
            );
          fileObj.uploaded = true;
          fileObj.serverRelativeUrl = uploadResult.data.ServerRelativeUrl;
        }
      }

      for (const file of formDetails?.AttachmentsDeletion?.value) {
        if (file.serverRelativeUrl) {
          await sp.web
            .getFileByServerRelativePath(file.serverRelativeUrl)
            .recycle();
        }
      }
      const documentDetails: IDocumentsDetails = {
        Id: recId,
        Category: payloadDetails?.Category,
        ContractType: payloadDetails?.ContractType,
        Party: payloadDetails?.Party,
        Date: payloadDetails?.Date,
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
        ProjectOfId: projectDetails?.Id,
        BreakPermission:payloadDetails?.IsBreakParentPermission
      };
updateDocumentMAUsers(
        manageAccessUsersDeserialized(payloadDetails?.ManageAccess),
        recId,
        projectDetails?.Id,
        SPLists?.Projectslist,
      )
      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...documentDetails } : item
        )
      );
      setLocalState((prev: any) =>
        prev.map((item: any) =>
          item.Id === recId ? { ...item, ...documentDetails } : item
        )
      );
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The document have been updated successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};

export {
  getLibraryAttachments,
  fetchDocumentsData,
  submitDocumentForm,
  updateDocumentForm,
};
