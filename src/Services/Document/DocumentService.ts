/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { sp } from "@pnp/sp";
import { SPLibraries, SPLists } from "../../Config/config";
import {
  IcountriesType,
  IDocumentsDetails,
  IProjectDetails,
} from "../../Interface/ModulesInterface";
import { togglePopupVisibility } from "../../Utils/togglePopup";
import {
  appendCategoryToFileName,
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  manageAccessUsersSerialized,
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
  projectId: number
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
    }).then();

    const tempArray: IDocumentsDetails[] = [];

    tempDocuments?.map((document: any) => {
      const documentDetails: IDocumentsDetails = {
        Id: document?.Id,
        Category: document?.Category,
        ManageAccess: manageAccessUsersDeserialized(document?.ManageAccess),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          document?.ManageAccess
        ),
        ProjectOfId: document?.ProjectOfId,
      };
      tempArray.push(documentDetails);
    });
    setMasterState(tempArray);
    setLocalState(tempArray);
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
  countryDetails: IcountriesType,
  projectDetails: IProjectDetails,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    Category: formDetails?.Category?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
    ProjectOfId: projectDetails?.Id,
  };
  debugger;
  await SpServices.SPAddItem({
    Listname: SPLists.DocumentsList,
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
      const documentDetails: IDocumentsDetails = {
        Id: res?.data?.Id,
        Category: payloadDetails?.Category,
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
        ProjectOfId: projectDetails?.Id,
      };

      setMasterState((prev: any) => {
        return [documentDetails, ...prev];
      });
      setLocalState((prev: any) => {
        return [documentDetails, ...prev];
      });
      togglePopupVisibility(setPopupController, index, "close");
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
  countryDetails: IcountriesType,
  projectDetails: IProjectDetails,
  setPopupController: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const recId = isUpdateDetails?.Id;
  const payloadDetails = {
    Category: formDetails?.Category?.value,
    ManageAccess: manageAccessUsersSerialized(formDetails?.ManageAccess?.value),
    ProjectOfId: projectDetails?.Id,
  };
  debugger;
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
        ManageAccess: manageAccessUsersDeserialized(
          payloadDetails?.ManageAccess
        ),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          payloadDetails?.ManageAccess
        ),
        ProjectOfId: projectDetails?.Id,
      };

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
      togglePopupVisibility(setPopupController, index, "close");
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
