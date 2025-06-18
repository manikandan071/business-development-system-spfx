/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import { SPLists } from "../../Config/config";
import {
  IProjectSubTaskDeatils,
  IProjectTaskDeatils,
} from "../../Interface/ModulesInterface";
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
    const items = await SpServices.SPReadItems({
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
    });
    const tempsetSubTasks: IProjectTaskDeatils[] = await Promise.all(
      items.map(async (task) => {
        const response = await SpServices.SPReadItems({
          Listname: SPLists?.SubTaskList,
          Select:
            "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title,Author/ID,Author/Title,Author/EMail,Tasks/ID,Tasks/Title",
          Expand: "AssignTo,ProjectOf,Author,Tasks",
          Filter: [
            {
              FilterKey: "TasksId",
              Operator: "eq",
              FilterValue: task?.ID,
            },
          ],
          Orderby: "Modified",
          Orderbydecorasc: false,
        });

        const tempSubTasks: IProjectSubTaskDeatils[] =
          response?.map((subTask) => ({
            ID: subTask.ID,
            TaskTitle: subTask.Title,
            Description: subTask.Descriptions,
            Priority: subTask.Priority,
            Status: subTask.Status,
            StartDate: subTask.StartDate,
            DueDate: subTask.DueDate,
            AssignTo: peopleHandler(subTask.AssignTo),
            isReminder: subTask?.isReminder,
            isTaskOverdue: subTask?.isTaskOverdue,
            ProjectOfID: subTask?.ProjectOf?.ID || null,
            ProjectOfTitle: subTask?.ProjectOf?.Title || null,
            CreatedBy: peopleHandler([subTask?.Author]),
            ParentId: task?.ID,
          })) || [];

        return {
          ID: task.ID,
          TaskTitle: task.Title,
          Description: task.Descriptions,
          Priority: task.Priority,
          Status: task.Status,
          StartDate: task.StartDate,
          DueDate: task.DueDate,
          AssignTo: peopleHandler(task.AssignTo),
          isReminder: task?.isReminder,
          isTaskOverdue: task?.isTaskOverdue,
          ProjectOfID: task?.ProjectOf?.ID || null,
          ProjectOfTitle: task?.ProjectOf?.Title || null,
          CreatedBy: peopleHandler([task?.Author]),
          SubTasks: tempSubTasks,
        };
      })
    );
    console.log("tempsetSubTasks", tempsetSubTasks);

    setLocalState(tempsetSubTasks);
    setMasterState(tempsetSubTasks);
    tasksUpdateToAllTasks(tempsetSubTasks);
    setLoader(false);

    // await SpServices.SPReadItems({
    //   Listname: SPLists.TasksList,
    //   Select:
    //     "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title,Author/ID,Author/Title,Author/EMail",
    //   Expand: "AssignTo,ProjectOf,Author",
    //   Filter: [
    //     projectId !== 0
    //       ? {
    //           FilterKey: "ProjectOfId",
    //           Operator: "eq",
    //           FilterValue: projectId,
    //         }
    //       : {},
    //   ],
    //   Orderby: "ID",
    //   Orderbydecorasc: false,
    // })
    //   .then((items) => {
    //     const tempsetTasks: IProjectTaskDeatils[] = [];
    //     items.map((tasks) =>
    //       tempsetTasks.push({
    //         ID: tasks.ID,
    //         TaskTitle: tasks.Title,
    //         Description: tasks.Descriptions,
    //         Priority: tasks.Priority,
    //         Status: tasks.Status,
    //         StartDate: tasks.StartDate,
    //         DueDate: tasks.DueDate,
    //         AssignTo: peopleHandler(tasks.AssignTo),
    //         isReminder: tasks?.isReminder,
    //         isTaskOverdue: tasks?.isTaskOverdue,
    //         ProjectOfID: tasks?.ProjectOf?.ID || null,
    //         ProjectOfTitle: tasks?.ProjectOf?.Title || null,
    //         CreatedBy: peopleHandler([tasks?.Author]),
    //       })
    //     );
    //     setLocalState(tempsetTasks);
    //     setMasterState(tempsetTasks);
    //     tasksUpdateToAllTasks(tempsetTasks);
    //     setLoader(false);
    //   })
    //   .catch((err) => console.log("Error reading SharePoint items:", err));
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
  index: number,
  currentUserDetails:any
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
        const newTaskValue: IProjectTaskDeatils = {
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
          CreatedBy: peopleHandler(currentUserDetails),
          SubTasks: [],
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
      if (recId === undefined) {
        throw new Error("recId is undefined");
      }
      const taskDetails: IProjectTaskDeatils = {
        ID: recId,
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
          item.ID === recId ? { ...item, ...taskDetails } : item
        );
        tasksUpdateToAllTasks(updated);
        return updated;
      });
      setLocalState((prev: any) => {
        const updated = prev.map((item: any) =>
          item.ID === recId ? { ...item, ...taskDetails } : item
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
// export const getSubtasksData = (
//   id: number | undefined,
//   setSubTasksMap: any,
//   setIsSubTaskLoader?: any
// ) => {
//   SpServices.SPReadItems({
//     Listname: SPLists?.SubTaskList,
//     Select:
//       "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title,Author/ID,Author/Title,Author/EMail",
//     Expand: "AssignTo,ProjectOf,Author",
//     Filter: [
//       {
//         FilterKey: "TasksId",
//         Operator: "eq",
//         FilterValue: id,
//       },
//     ],
//     Orderby: "Modified",
//     Orderbydecorasc: false,
//   })
//     .then((res) => {
//       debugger;
//       console.log(res, "response from subtasks");
//       const tempSubTasks: IProjectSubTaskDeatils[] = [];
//       res.forEach((tasks: any) => {
//         tempSubTasks.push({
//           ID: tasks.ID,
//           TaskTitle: tasks.Title,
//           Description: tasks.Descriptions,
//           Priority: tasks.Priority,
//           Status: tasks.Status,
//           StartDate: tasks.StartDate,
//           DueDate: tasks.DueDate,
//           AssignTo: peopleHandler(tasks.AssignTo),
//           isReminder: tasks?.isReminder,
//           isTaskOverdue: tasks?.isTaskOverdue,
//           ProjectOfID: tasks?.ProjectOf?.ID || null,
//           ProjectOfTitle: tasks?.ProjectOf?.Title || null,
//           CreatedBy: peopleHandler([tasks?.Author]),
//           ParentId: tasks?.TasksId,
//         });
//       });
//       setSubTasksMap((prevMap: any) => ({
//         ...prevMap,
//         [id!]: tempSubTasks,
//       }));
//       setIsSubTaskLoader(false);
//     })
//     .catch((err) => {
//       console.log("Error fetching subtasks: ", err);
//     });
// };
export const submitSubTaskForm = async (
  formDetails: any,
  setMasterState: any,
  setLocalState: any,
  taskTypeController: any,
  setPopupResponse: any,
  index: number,
  currentUserDetails:any
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
      TasksId: taskTypeController?.ParentTaskId,
    };
    await SpServices.SPAddItem({
      Listname: SPLists.SubTaskList,
      RequestJSON: requestPayload,
    })
      .then((newSubTask: any) => {
        const tempSubTaskDetails: IProjectSubTaskDeatils = {
          ID: newSubTask.data?.Id,
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
          CreatedBy: peopleHandler(currentUserDetails),
          ParentId: taskTypeController?.ParentTaskId,
        };
        console.log(tempSubTaskDetails)
        setMasterState((prevTasks: IProjectTaskDeatils[]) =>
          prevTasks?.map((task: any) => {
            if (task.ID !== taskTypeController?.ParentTaskId) return task;
            const updatedSubtasks:any[] = task?.SubTasks;
            // updatedSubtasks.push(tempSubTaskDetails)
            return {
              ...task,
              SubTasks: [tempSubTaskDetails,...updatedSubtasks],
            };
          })
        );
        setLocalState((prevTasks: IProjectTaskDeatils[]) =>
          prevTasks?.map((task: any) => {
            if (task.ID !== taskTypeController?.ParentTaskId) return task;
            const updatedSubtasks:any[] = task?.SubTasks;
           
            return {
              ...task,
              SubTasks: [tempSubTaskDetails,...updatedSubtasks]
            };
          })
        );
        setPopupResponseFun(
          setPopupResponse,
          index,
          false,
          "Success!",
          "New sub task have been added successfully."
        );
      })
      .catch((err) => console.error(err));
  } catch (err: any) {
    console.log("Error in addSubTaskList:", err);
  }
};
export const updateSubTaskForm = async (
  formDetails: any,
  setMasterState: any,
  setLocalState: any,
  taskTypeController: any,
  setPopupResponse: any,
  index: number
) => {
  const recId = taskTypeController?.TaskId;
  try {
    const payloadDetails = {
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
    await SpServices.SPUpdateItem({
      Listname: SPLists.SubTaskList,
      ID: recId,
      RequestJSON: payloadDetails,
    })
      .then((updateSubTask: any) => {
        console.log("updateSubTask", updateSubTask);
        const tempSubTaskDetails: IProjectSubTaskDeatils = {
          ID: recId,
          TaskTitle: payloadDetails.Title,
          Description: payloadDetails.Descriptions,
          Priority: payloadDetails.Priority,
          Status: payloadDetails.Status,
          StartDate: payloadDetails.StartDate,
          DueDate: payloadDetails.DueDate,
          AssignTo: peopleHandler(formDetails.AssignedTo.value),
          isReminder: payloadDetails.isReminder,
          isTaskOverdue: payloadDetails.isTaskOverdue,
          ProjectOfID: formDetails.ProjectOfID?.value,
          ProjectOfTitle: formDetails.ProjectOfTitle?.value,
          ParentId: taskTypeController?.ParentTaskId,
        };
        setMasterState((prevTasks: IProjectTaskDeatils[]) =>
          prevTasks.map((task: any) => {
            if (task.ID !== taskTypeController?.ParentTaskId) return task;
            const updatedSubtasks = task?.SubTasks.map((sub: any) =>
              sub.ID === recId ? { ...sub, ...tempSubTaskDetails } : sub
            );
            return {
              ...task,
              SubTasks: updatedSubtasks,
            };
          })
        );
        setLocalState((prevTasks: IProjectTaskDeatils[]) =>
          prevTasks.map((task: any) => {
            if (task.ID !== taskTypeController?.ParentTaskId) return task;
            const updatedSubtasks = task?.SubTasks?.map((sub: any) =>
              sub.ID === recId ? { ...sub, ...tempSubTaskDetails } : sub
            );
            return {
              ...task,
              SubTasks: updatedSubtasks,
            };
          })
        );
        setPopupResponseFun(
          setPopupResponse,
          index,
          false,
          "Success!",
          "Sub task have been updated successfully."
        );
      })
      .catch((err) => console.error(err));
  } catch (err: any) {
    console.log("Error in update SubTaskList:", err);
  }
};
  export const generateStatusCounts = (
    tasks: any[],
    setStatusCount: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const statusOrder = ["Not Started", "In Progress", "Completed", "Overdue"];
    const summaryMap: { [key: string]: number } = {};
    tasks.forEach((task) => {
      const status = task?.Status || "Unknown";
      summaryMap[status] = (summaryMap[status] || 0) + 1;
    });
    const summaryArray = Object.entries(summaryMap)
    .filter(([status]) => status !== "Unknown")
    .map(([status, count]) => ({
      status,
      count,
    }));
    setStatusCount(
      summaryArray?.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      )
    );
  };
