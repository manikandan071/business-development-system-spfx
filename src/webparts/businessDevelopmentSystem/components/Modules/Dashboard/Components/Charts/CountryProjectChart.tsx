/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  //   CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const CountryProjectChart: React.FC = () => {
  const countryDataState: any = useSelector(
    (state: any) => state.CountryContextSlice.countryData
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[...countryDataState]?.sort(
          (a: any, b: any) => b.ProjectCount - a.ProjectCount
        )}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="countryName"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Bar dataKey="ProjectCount" fill="#60553b" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CountryProjectChart;
