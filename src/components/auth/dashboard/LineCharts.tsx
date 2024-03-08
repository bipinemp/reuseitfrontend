"use client";

import { useLineChartData } from "@/apis/queries";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const LineCharts = () => {
  const { data: LineData, isPending: LineDataLoading } = useLineChartData();

  var ThisYear = new Date().getFullYear();
  var PrevYear = ThisYear - 1;

  return (
    <div className="flex h-[530px] w-[65%] flex-col justify-between rounded-lg border border-input pb-5 pr-5 pt-5 shadow-lg">
      {LineDataLoading && <h1>Loading...</h1>}
      <h1 className="ml-14 font-bold text-gray-600">Users</h1>
      {/* Line Chart  */}
      {LineData && LineData.engagementData.length > 0 && (
        <div className="relative h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={LineData.engagementData.map((data: any) => ({
                ...data,
                name: data.month,
              }))}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={ThisYear}
                stroke="#8884d8"
                // activeDot={{ r: 8 }}
                strokeWidth={5}
              />
              <Line
                type="monotone"
                dataKey={PrevYear}
                stroke="#82ca9d"
                strokeWidth={5}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default LineCharts;
