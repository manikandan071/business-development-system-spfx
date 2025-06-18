import * as React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface CountryData {
  countryName: string;
  ProjectCount: number;
}

const CountryProjectChart: React.FC = () => {
  const countryDataState = useSelector(
    (state: any) => state.CountryContextSlice.countryData
  ) as CountryData[];

  const sortedData = [...countryDataState]?.sort(
    (a, b) => b.ProjectCount - a.ProjectCount
  );

  const barWidth = 100;
  const chartWidth = sortedData.length * barWidth;
  // const chartHeight = 300; // Adjust to fit inside `.second_row_wrapper` (consider padding too)

  return (
  <>  
  {sortedData.length!==0 && sortedData.some((data)=>data.ProjectCount>0)?(
     <div style={{ overflowX: "auto", height: "100%", flex: 1 }}>
    <div style={{ width: chartWidth, height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sortedData}>
          <XAxis
            dataKey="countryName"
            tick={{ fontSize: 12 }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
           <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          style={{
            position: "fixed",
            left: 0,
            background: "#fff", 
            zIndex: 1,
          }}/>
          <Tooltip />
          <Bar dataKey="ProjectCount" fill="#60553b" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
  ):(<div className="no_data_found_message chart">No records found.</div>
        )}
  </>
);
  
};

export default CountryProjectChart;
