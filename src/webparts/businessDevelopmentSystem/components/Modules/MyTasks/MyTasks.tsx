import * as React from "react";
import styles from "./MyTasks.module.scss";
import ModuleHeader from "../../Common/Headers/ModuleHeader/ModuleHeader";
import ToDoList from "../Projects/ProjectsSections/ToDoList/ToDoList";

const MyTasks: React.FC = () => {
  return (<>
  <div className="justify-space-between margin-right-20">
        <ModuleHeader title="My Tasks" />
        </div>
  <div className={styles.mytasks_container}>
     <div style={{ width: "82%" }}>
        <ToDoList/>
      </div>
      <div
        style={{
          width: "18%",
        }}
      >
        Task Details.....
      </div>
        </div>
  </>)
};

export default MyTasks;
