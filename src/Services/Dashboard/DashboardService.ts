/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { sp } from "@pnp/sp";
import { SPLibraries, SPLists } from "../../Config/config";
import { ICalenderDetails } from "../../Interface/ModulesInterface";
import { setCountriesData } from "../../Redux/Features/CountryContextSlice";
import {
  manageAccessUsersDeserialized,
  manageAccessUsersDeserializedForForm,
  peopleHandler,
} from "../CommonService/CommonService";
import SpServices from "../SPServices/SpServices";

const fetchCountryData = async (dispatch: any) => {
  const items = await SpServices.SPReadItems({
    Listname: SPLists.Countrieslist,
    Select: "*,Manager/ID,Manager/Title,Manager/EMail",
    Expand: "Manager",
    Orderby: "ID",
    Orderbydecorasc: false,
  });

  const tempsetCountries = await Promise.all(
    items.map(async (country) => {
      const response = await SpServices.SPReadItems({
        Listname: SPLists.Projectslist,
        Select: "*,CountryOf/Id,CountryOf/Title",
        Expand: "CountryOf",
        Filter: [
          {
            FilterKey: "CountryOfId",
            Operator: "eq",
            FilterValue: country?.ID,
          },
        ],
      });

      return {
        ID: country.ID,
        countryName: country.Title,
        ProjectCount: response?.length || 0,
        ISOCode: country.ISOCode,
        Manager: peopleHandler(country?.Manager),
        Languages: country?.Language,
        Region: country?.Region,
        Currency: country?.Currency,
        TimeZone: country?.TimeZone,
        Status: country?.Status,
        Notes: country?.Notes,
        ManageAccess: manageAccessUsersDeserialized(country?.ManageAccess),
        ManageAccessFormFormat: manageAccessUsersDeserializedForForm(
          country?.ManageAccess
        ),
      };
    })
  );
  dispatch(setCountriesData([...tempsetCountries]));
};

const fetchEventsData = async (setEventsData: any) => {
  try {
    const today = new Date().toISOString();
    const tempCalenders = await SpServices.SPReadItems({
      Listname: SPLists.Calenderlist,
      Select:
        "*,AssignedTo/ID,AssignedTo/Title,AssignedTo/EMail,ProjectOf/Id,ProjectOf/Title,Author/ID,Author/Title,Author/EMail",
      Expand: "AssignedTo,ProjectOf,Author",
      Filter: [
        {
          FilterKey: "EventDateTime",
          Operator: "ge",
          FilterValue: today,
        },
      ],
      Orderby: "EventDateTime",
      Orderbydecorasc: true,
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
        CreatedBy: peopleHandler([calender?.Author]),
      };
      tempArray.push(obligationDetails);
    });
    setEventsData(tempArray);
  } catch (err) {
    console.log("Error : ", err);
  }
};
const fetchTasksData = async (setEventsData: any) => {
  // const today = new Date().toISOString();
  try {
    await SpServices.SPReadItems({
      Listname: SPLists.TasksList,
      Select:
        "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title",
      Expand: "AssignTo,ProjectOf",
      // Filter: [
      //   {
      //     FilterKey: "StartDate",
      //     Operator: "ge",
      //     FilterValue: today,
      //   },
      // ],
      Orderby: "ID",
      Orderbydecorasc: false,
    })
      .then((items) => {
        const tempsetTasks: any[] = [];
        items.map((tasks) =>
          tempsetTasks.push({
            ID: tasks.ID,
            TaskTitle: tasks.Title,
            Description: tasks.Descriptions,
            Priority: tasks.Priority,
            Status: tasks.Status,
            StartDate: tasks.StartDate,
            DueDate: tasks.DueDate,
            AssignTo: peopleHandler(tasks.AssignTo),
            isReminder: tasks?.isReminder,
            isTaskOverdue: tasks?.isTaskOverdue,
            ProjectOfID: tasks?.ProjectOf?.ID || null,
            ProjectOfTitle: tasks?.ProjectOf?.Title || null,
          })
        );
        setEventsData([...tempsetTasks, ...tempsetTasks]);
      })
      .catch((err) => console.log("Error reading SharePoint items:", err));
  } catch (err: any) {
    console.log("Error in getTasksList", err);
  }
};

const getAllFilesRecursively = async (folderUrl: string): Promise<any[]> => {
  const allFiles: any[] = [];

  try {
    // Get files in the current folder
    const files = await sp.web
      .getFolderByServerRelativeUrl(folderUrl)
      .files.select(
        "Name",
        "ServerRelativeUrl",
        "TimeLastModified",
        "Author/ID",
        "Author/Title",
        "Author/EMail"
      )
      .expand("Author")
      .get();

    const enrichedFiles = files.map((file: any) => ({
      ...file,
      CreatedBy: peopleHandler([file?.Author]),
    }));

    allFiles.push(...enrichedFiles);

    // Get subfolders (excluding system folders like Forms)
    const subFolders = await sp.web
      .getFolderByServerRelativeUrl(folderUrl)
      .folders.filter("Name ne 'Forms'")
      .get();

    // Recursively get files from subfolders
    for (const folder of subFolders) {
      const subFiles = await getAllFilesRecursively(folder.ServerRelativeUrl);
      allFiles.push(...subFiles);
    }
  } catch (err) {
    console.error(`Error reading folder ${folderUrl}:`, err);
  }

  return allFiles;
};

const extractMetadataFromUrl = (serverRelativeUrl: string) => {
  const parts = serverRelativeUrl.split("/");

  // Example:
  // ["", "sites", "BusinessDevelopmentSystem", "ProjectAttachments", "Eritrea", "04-06 testing project", "Meeting Notes", "image (1)_Meeting Notes.jpg"]

  const index = parts.indexOf("ProjectAttachments");

  if (index !== -1 && parts.length >= index + 4) {
    const country = parts[index + 1];
    const project = parts[index + 2];
    const documentType = parts[index + 3];

    return { country, project, documentType };
  }

  return { country: "", project: "", documentType: "" };
};

const fetchRecentDocuments = async (
  setDocumentsData: any,
  setIsLoader: any
) => {
  const libraryRoot = `/sites/BusinessDevelopmentSystem/${SPLibraries.ProjectDocuments}`; // or your custom library root
  const files = await getAllFilesRecursively(libraryRoot);

  const enrichedFiles = files.map((file) => {
    const metadata = extractMetadataFromUrl(file.ServerRelativeUrl);
    return {
      ...file,
      ...metadata,
    };
  });

  // Optional: sort by latest modified
  const sortedFiles = enrichedFiles.sort(
    (a: any, b: any) =>
      new Date(b.TimeLastModified).getTime() -
      new Date(a.TimeLastModified).getTime()
  );
  setDocumentsData(sortedFiles);
  setIsLoader(false);
};

// const fetchRecentDocuments = async (setDocumentsData: any) => {
//   try {
//     const files = await sp.web
//       .getFolderByServerRelativeUrl(
//         `/sites/BusinessDevelopmentSystem/${SPLibraries.ProjectDocuments}`
//       )
//       .files.select(
//         "Name",
//         "TimeLastModified",
//         "ServerRelativeUrl",
//         "UniqueId",
//         "Author/Title"
//       )
//       .expand("Author")
//       .orderBy("TimeLastModified", false)
//       .top(100)
//       .get();

//     console.log("Latest files:", files);
//     setDocumentsData(files);
//   } catch (err) {
//     console.log("Error getting sorted files:", err);
//   }
// };

export {
  fetchCountryData,
  fetchEventsData,
  fetchTasksData,
  fetchRecentDocuments,
};
