"use client";

import { useLineChartData } from "@/apis/queries";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineCharts = () => {
  const { data: LineData, isPending: LineDataLoading } = useLineChartData();

  var ThisYear = new Date().getFullYear();
  var PrevYear = ThisYear - 1;

  return (
    <div className="w-[65%] rounded-lg border border-input pb-5 pr-5 pt-5 shadow-lg">
      {LineDataLoading && <h1>Loading...</h1>}
      {/* Line Chart  */}
      {LineData && LineData.engagementData.length > 0 && (
        <div className="relative mx-auto h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={LineData.engagementData.map((data: any) => ({
                ...data,
                name: data.month,
              }))}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey={ThisYear}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
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
