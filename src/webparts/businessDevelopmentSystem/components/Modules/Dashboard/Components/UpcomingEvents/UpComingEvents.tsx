/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { ICalenderDetails } from "../../../../../../../Interface/ModulesInterface";
import "./UpComingEvents.css";

interface IUpcomingEventsProps {
  eventsData: ICalenderDetails[];
}

const UpComingEvents: React.FC<IUpcomingEventsProps> = ({ eventsData }) => {
  const formatEventDate = (isoString: string) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { day, month, time };
  };
  return (
    <div className="events_dashboard">
      <div className="event-header">
        <span>Upcoming Events ({eventsData?.length})</span>
        {/* <button>view all</button> */}
      </div>
      <div className="events_dashboard_wrapper">
        {eventsData?.length === 0 && (
          <div className="no_data_found_message">No records found.</div>
        )}
        {eventsData?.map((events: ICalenderDetails, index: number) => {
          const { day, month, time } = formatEventDate(events?.EventDateTime);
          return (
            <div className="event-card" key={index}>
              <div className="event-date">
                <div className="event-day">{day}</div>
                <div className="event-month">{month}</div>
              </div>
              <div className="event-details">
                <div className="event-title">{events?.EventTitle}</div>
                <div className="event-time">{time}</div>
                <div className="event-user">
                  <span>{events?.CreatedBy?.[0]?.DisplayName}</span>
                  <img
                    src={events?.CreatedBy?.[0]?.ImgUrl}
                    alt={events?.CreatedBy?.[0]?.DisplayName}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpComingEvents;
