/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPLists } from "../../Config/config";
import { togglePopupVisibility } from "../../Utils/togglePopup";
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
        id: personVal.ID,
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
      Select: "*,AssignTo/ID,AssignTo/Title,AssignTo/EMail,ProjectOf/ID,ProjectOf/Title",
      Expand: "AssignTo,ProjectOf",
      Orderby: "Id",
      Orderbydecorasc: false,
    })
      .then((items) => {
        console.log("Retrived Items",items);
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
            isReminder:tasks?.isReminder,
            isTaskOverdue:tasks?.isTaskOverdue,
            ProjectOfID:tasks?.ProjectOf?.ID || null,
            ProjectOfTitle:tasks?.ProjectOf?.Title || null,
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
      Descriptions: taskData.Description?.value,
      Priority: taskData.Priority.value,
      Status: taskData.Status.value,
      StartDate: taskData.StartDate.value,
      DueDate: taskData.DueDate.value,
      AssignToId: {
        results: taskData.selectedPeople.value?.map(
          (assignTo: any) => assignTo.id
        ),
      },
      isReminder:taskData.isReminder?.value,
      isTaskOverdue:taskData.isTaskOverdue?.value,
      ProjectOfId: taskData.ProjectOfID?.value
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
          isReminder:newTask.data?.isReminder,
          isTaskOverdue:newTask.data?.isTaskOverdue,
          ProjectOfID:taskData.ProjectOfID?.value,
          ProjectOfTitle:taskData.ProjectOfTitle?.value
        };
        setToDoList((prev: any[]) => [newTaskValue, ...prev]);
      })
      .catch((err) => console.error(err));
  } catch (err: any) {
    console.log("Error in addTaskList:", err);
  }
};
export const updateTask=async(
  formDetails:any,
  recId:number | undefined,
  setMasterState:any,
  setToDoList:any,
  setPopupController: any,
  index: number
)=>{
  console.log("formDetails", formDetails);
  const selectedPeople = formDetails?.selectedPeople?.value?.length
    ? formDetails.selectedPeople.value
    : formDetails.AssignTo || []; 

  const managerData = selectedPeople.map((manager: any) => ({
    ID: manager.id || manager.ID,     
    Title: manager.name || manager.text,
    EMail: manager.email || manager.secondaryText,
  }));
  const payloadDetails = {
        Title: formDetails?.TaskTitle?.value,
        Descriptions: formDetails?.Description?.value,
        Priority: formDetails?.Priority?.value,
        Status: formDetails?.Status?.value,
        StartDate: formDetails?.StartDate?.value,
        DueDate: formDetails?.DueDate?.value,
        AssignToId:{
      results: formDetails.selectedPeople.value?.map(
        (manager: any) => manager.id
      ),
    },
        isReminder:formDetails?.isReminder?.value,
        isTaskOverdue:formDetails?.isTaskOverdue?.value,
        ProjectOfId:formDetails.ProjectOfID?.value,
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
        AssignTo: peopleHandler(managerData),
        isReminder:payloadDetails?.isReminder,
        isTaskOverdue:payloadDetails?.isTaskOverdue,
        ProjectOfID:formDetails.ProjectOfID?.value,
        ProjectOfTitle:formDetails.ProjectOfTitle?.value
      }
      setMasterState((prev: any) =>
        prev.map((item: any) =>
          item.ID === recId ? { ...item, ...taskDetails } : item
        )
      );
      setToDoList((prev: any) =>
        prev.map((item: any) =>
          item.ID === recId ? { ...item, ...taskDetails } : item
        )
      );
      togglePopupVisibility(setPopupController, index, "close");
    })
    .catch((err: any) => {
      console.log("Error :", err);
    });
};
export const getProjectList = async (
  setProjectOfData: any
) => {
  try {
    await SpServices.SPReadItems({
      Listname: SPLists.Projectslist,
    }).then((items)=>{
      console.log("ProjectItems",items)
      const tempProjectData:any[]=[]
      items.map((project)=>tempProjectData.push({
        ID:project.ID,
        Title:project.Title,
      }))
      setProjectOfData(tempProjectData)
    }).catch(err=>console.log("error in getProjectList"))
  }catch(err:any){
    console.log("error",err)}
}
