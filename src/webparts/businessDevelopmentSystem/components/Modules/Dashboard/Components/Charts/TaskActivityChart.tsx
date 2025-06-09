/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 40, color: "#ffffff" },
  { name: "Pending", value: 30, color: "#4e95f7" },
  { name: "Overdue", value: 30, color: "#f97c3c" },
];

const TaskActivityChart: React.FC = () => {
  return (
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
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
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
  );
};

export default TaskActivityChart;
