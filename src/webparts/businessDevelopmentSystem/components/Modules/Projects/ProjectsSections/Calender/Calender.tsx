/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./Calender.module.scss";
import "./Calender.css";
import DefaultButton from "../../../../Common/Buttons/DefaultButton/DefaultButton";
import AddIcon from "@mui/icons-material/Add";

const Calender: React.FC = () => {
  const events = [
    {
      title: "Team meeting Team meeting Team meeting Team meeting",
      date: "2025-05-18T09:00:00",
    },
    { title: "Internal discussion", date: "2025-05-18T13:00:00" },
    { title: "Follow-up", date: "2025-05-18T15:00:00" },
    { title: "Another Task", date: "2025-05-18T17:00:00" },
    {
      title: "Team meeting Team meeting Team meeting Team meeting",
      date: "2025-05-15T09:00:00",
    },
    { title: "Internal discussion", date: "2025-05-15T13:00:00" },
    { title: "Follow-up", date: "2025-05-10T15:00:00" },
    { title: "Another Task", date: "2025-05-10T17:00:00" },
  ];
  const handleEventClick = (
    info: import("@fullcalendar/core").EventClickArg
  ) => {
    const selectedEvent = info.event;
    // Open your event edit modal/form here
    console.log("Clicked event:", selectedEvent.title);
  };

  return (
    <div className={styles.Calender_wrapper}>
      <div className="justify-end gap-10">
        <DefaultButton
          btnType="primaryBtn"
          text="Add new critical date"
          startIcon={<AddIcon />}
        />
      </div>
      <div className={styles.Calender_main}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dayMaxEvents={2}
          height="auto"
          firstDay={1}
        />
      </div>
    </div>
  );
};

export default Calender;
