/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ITasksDetails } from "../../../../../../../Interface/ModulesInterface";
import { generateStatusCounts } from "../../../../../../../Services/Tasks/TaskService";
interface TaskActivityChartProps {
  taskData: ITasksDetails[];
}

const TaskActivityChart: React.FC<TaskActivityChartProps> = ({ taskData }) => {
  const COLORS = [
    "#845EC2",
    "#D65DB1",
    "#2C73D2",
    "#0081CF",
    "#FFC75F",
    "#FF6F91",
  ];
  const colorTemplate = (status: string, index: number) => {
    if (status === "Not Started") {
      return "#4e95f7";
    } else if (status === "In Progress") {
      return "#f5f543";
    } else if (status === "Completed") {
      return "#00C49F";
    } else if (status === "Overdue") {
      return "#ff9393";
    } else {
      return COLORS[index % COLORS.length];
    }
  };
  const [data, setChartData] = React.useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [statusCounts, setStatusCount] = React.useState<
    { status: string; count: number }[]
  >([]);
  React.useEffect(() => {
    generateStatusCounts(taskData, setStatusCount);
  }, [taskData]);
  React.useEffect(() => {
    const chartFormattedData = statusCounts
      .filter((item) => item.status !== "Unknown")
      .map((item, index) => ({
        name: item.status,
        value: item.count,
        color: colorTemplate(item.status, index),
      }));
    setChartData(chartFormattedData);
  }, [statusCounts]);
  return (
    <>
      {data.length !== 0 ? (
        <div
          className="rounded-2xl p-4 shadow-md"
          style={{
            background: "linear-gradient(to right, #6f4c52, #51262d)",
            color: "#fff",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="no_data_found_message chart" style={{color:"#FFF"}}>No records found.</div>
        </div>
      ) : (
        <div
          className="rounded-2xl p-4 shadow-md"
          style={{
            background: "linear-gradient(to right, #6f4c52, #51262d)",
            color: "#fff",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
          }}
        >
          <ResponsiveContainer width="100%" height={170}>
            <PieChart  >
              <Tooltip />
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={90}
                paddingAngle={0}
                cursor="pointer"
                // 
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}

              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            {data.map((item, index) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                key={index}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "12px" }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskActivityChart;
