/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPLists } from "../../Config/config";
import SpServices from "../SPServices/SpServices";
const peopleHandler = (AssignTo: any[]) => {
  const tempperson: any[] = [];
  try {
    AssignTo?.forEach((personVal: any) => {
      tempperson.push({
        key: 1,
        imgUrl:
          `/_layouts/15/userphoto.aspx?size=S&accountname=` +
          `${personVal.EMail}`,
        text: personVal.Title,
        ID: personVal.ID,
        secondaryText: personVal.EMail,
        isValid: true,
      });
    });
  } catch (err) {
    console.log("Error from people Handler", err);
  }
  return tempperson;
};
export const getTasksList = async (
  setToDoList: any,
  setMasterTasksData: any
) => {
  try {
    await SpServices.SPReadItems({
      Listname: SPLists.TasksList,
      Select: "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail",
      Expand: "AssignTo",
      Orderby: "Id",
      Orderbydecorasc: false,
    })
      .then((items) => {
        console.log(items);
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
          })
        );
        console.log("Tasks", tempsetTasks);
        setToDoList(tempsetTasks);
        setMasterTasksData(tempsetTasks);
      })
      .catch((err) => console.log("Error reading SharePoint items:", err));
  } catch (err: any) {
    console.log("Error in getTasksList", err);
  }
};
export const addNewTask = async (taskData: any, setToDoList: any) => {
  try {
    const AssignData = taskData?.selectedPeople?.value.map((AssignTo: any) => ({
      ID: AssignTo.id,
      Title: AssignTo.name,
      EMail: AssignTo.email,
    }));
    const requestPayload = {
      Title: taskData.TaskTitle.value,
      Descriptions: taskData.Description.value,
      Priority: taskData.Priority.value,
      Status: taskData.Status.value,
      StartDate: taskData.StartDate.value,
      DueDate: taskData.DueDate.value,
      AssignToId: {
        results: taskData.selectedPeople.value?.map(
          (assignTo: any) => assignTo.id
        ),
      },
    };
    await SpServices.SPAddItem({
      Listname: SPLists.TasksList,
      RequestJSON: requestPayload,
    })
      .then((newTask: any) => {
        console.log("New Task", newTask);

        const newTaskValue = {
          ID: newTask.data?.Id,
          TaskTitle: newTask.data?.Title,
          Description: newTask.data?.Descriptions,
          Priority: newTask.data?.Priority,
          Status: newTask.data?.Status,
          StartDate: newTask.data?.StartDate,
          DueDate: newTask.data?.DueDate,
          AssignTo: peopleHandler(AssignData),
        };
        setToDoList((prev: any[]) => [newTaskValue, ...prev]);
      })
      .catch((err) => console.error(err));
  } catch (err: any) {
    console.log("Error in addTaskList:", err);
  }
};
