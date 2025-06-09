/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPLists } from "../../Config/config";
import { IProjectTaskDeatils } from "../../Interface/ModulesInterface";
import { setPopupResponseFun } from "../../Utils/togglePopup";
import { peopleHandler } from "../CommonService/CommonService";
import SpServices from "../SPServices/SpServices";
// const peopleHandler = (AssignTo: any[]) => {
//   const tempperson: any[] = [];
//   try {
//     AssignTo?.forEach((personVal: any) => {
//       tempperson.push({
//         key: 1,
//         imgUrl:
//           `/_layouts/15/userphoto.aspx?size=S&accountname=` +
//           `${personVal.EMail}`,
//         text: personVal.Title,
//         id: personVal.ID,
//         secondaryText: personVal.EMail,
//         isValid: true,
//       });
//     });
//   } catch (err) {
//     console.log("Error from people Handler", err);
//   }
//   return tempperson;
// };
export const fetchProjectTasks = async (
  setMasterState: any,
  setLocalState: any,
  tasksUpdateToAllTasks: any,
  projectId: number,
  setLoader: any
) => {
  try {
    await SpServices.SPReadItems({
      Listname: SPLists.TasksList,
      Select:
        "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title,Author/ID,Author/Title,Author/EMail",
      Expand: "AssignTo,ProjectOf,Author",
      Filter: [
        projectId !== 0
          ? {
              FilterKey: "ProjectOfId",
              Operator: "eq",
              FilterValue: projectId,
            }
          : {},
      ],
      Orderby: "ID",
      Orderbydecorasc: false,
    })
      .then((items) => {
        const tempsetTasks: IProjectTaskDeatils[] = [];
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
            CreatedBy: peopleHandler([tasks?.Author]),
          })
        );
        setLocalState(tempsetTasks);
        setMasterState(tempsetTasks);
        tasksUpdateToAllTasks(tempsetTasks);
        setLoader(false);
      })
      .catch((err) => console.log("Error reading SharePoint items:", err));
  } catch (err: any) {
    console.log("Error in getTasksList", err);
  }
};
export const submitProjectTaskForm = async (
  formDetails: any,
  setMasterState: any,
  setLocalState: any,
  tasksUpdateToAllTasks: any,
  setPopupResponse: any,
  index: number
) => {
  try {
    const requestPayload = {
      Title: formDetails.TaskTitle.value,
      Descriptions: formDetails.Description?.value,
      Priority: formDetails.Priority.value,
      Status: formDetails.Status.value,
      StartDate: formDetails.StartDate.value,
      DueDate: formDetails.DueDate.value,
      AssignToId: {
        results: formDetails.AssignedTo.value?.map(
          (assignTo: any) => assignTo.id || assignTo.ID || assignTo.Id
        ),
      },
      isReminder: formDetails.isReminder?.value ? true : false,
      isTaskOverdue: formDetails.isTaskOverdue?.value ? true : false,
      ProjectOfId: formDetails.ProjectOfID?.value,
    };
    await SpServices.SPAddItem({
      Listname: SPLists.TasksList,
      RequestJSON: requestPayload,
    })
      .then((newTask: any) => {
        const newTaskValue = {
          ID: newTask.data?.Id,
          TaskTitle: requestPayload.Title,
          Description: requestPayload.Descriptions,
          Priority: requestPayload.Priority,
          Status: requestPayload.Status,
          StartDate: requestPayload.StartDate,
          DueDate: requestPayload.DueDate,
          AssignTo: peopleHandler(formDetails.AssignedTo.value),
          isReminder: requestPayload.isReminder,
          isTaskOverdue: requestPayload.isTaskOverdue,
          ProjectOfID: formDetails.ProjectOfID?.value,
          ProjectOfTitle: formDetails.ProjectOfTitle?.value,
        };

        setMasterState((prev: any) => {
          const updated = [newTaskValue, ...prev];
          tasksUpdateToAllTasks(updated);
          return updated;
        });
        setLocalState((prev: any) => {
          const updated = [newTaskValue, ...prev];
          return updated;
        });
        setPopupResponseFun(
          setPopupResponse,
          index,
          false,
          "Success!",
          "New task have been added successfully."
        );
      })
      .catch((err) => console.error(err));
  } catch (err: any) {
    console.log("Error in addTaskList:", err);
  }
};
export const updateProjectTaskForm = async (
  formDetails: any,
  recId: number | undefined,
  setMasterState: any,
  setLocalState: any,
  tasksUpdateToAllTasks: any,
  setPopupResponse: any,
  index: number
) => {
  console.log("formDetails", formDetails);
  const payloadDetails = {
    Title: formDetails?.TaskTitle?.value,
    Descriptions: formDetails?.Description?.value,
    Priority: formDetails?.Priority?.value,
    Status: formDetails?.Status?.value,
    StartDate: formDetails?.StartDate?.value,
    DueDate: formDetails?.DueDate?.value,
    AssignToId: {
      results: formDetails.AssignedTo.value?.map(
        (assignTo: any) => assignTo.id || assignTo.ID || assignTo.Id
      ),
    },
    isReminder: formDetails?.isReminder?.value ? true : false,
    isTaskOverdue: formDetails?.isTaskOverdue?.value ? true : false,
    ProjectOfId: formDetails.ProjectOfID?.value,
  };
  SpServices.SPUpdateItem({
    Listname: SPLists.TasksList,
    ID: recId,
    RequestJSON: payloadDetails,
  })
    .then((res: any) => {
      console.log("res", res);
      const taskDetails = {
        TaskTitle: payloadDetails.Title,
        Description: payloadDetails?.Descriptions,
        Priority: payloadDetails.Priority,
        Status: payloadDetails.Status,
        StartDate: payloadDetails.StartDate,
        DueDate: payloadDetails.DueDate,
        AssignTo: peopleHandler(formDetails.AssignedTo.value),
        isReminder: payloadDetails?.isReminder,
        isTaskOverdue: payloadDetails?.isTaskOverdue,
        ProjectOfID: formDetails.ProjectOfID?.value,
        ProjectOfTitle: formDetails.ProjectOfTitle?.value,
      };
      setMasterState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...taskDetails } : item
        );
        tasksUpdateToAllTasks(updated);
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.Id === recId ? { ...item, ...taskDetails } : item
        );
        return updated;
      });
      setPopupResponseFun(
        setPopupResponse,
        index,
        false,
        "Success!",
        "The task have been updated successfully."
      );
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
export const getProjectList = async (setProjectOfData: any) => {
  try {
    await SpServices.SPReadItems({
      Listname: SPLists.Projectslist,
    })
      .then((items) => {
        const tempProjectData: any[] = [];
        items.map((project) =>
          tempProjectData.push({
            ID: project.ID,
            Title: project.Title,
          })
        );
        setProjectOfData(tempProjectData);
      })
      .catch((err) => console.log("error in getProjectList"));
  } catch (err: any) {
    console.log("error", err);
  }
};
