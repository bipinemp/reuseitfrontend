"use client";

import { getCustomersAnalytics } from "@/apis/apicalls";
import { useLineChartData } from "@/apis/queries";
import { useQuery } from "@tanstack/react-query";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminLineCharts = () => {
  const { data: LineData, isPending: LineDataLoading } = useQuery({
    queryKey: ["customeranalytics"],
    queryFn: getCustomersAnalytics,
  });

  var ThisYear = new Date().getFullYear();
  var PrevYear = ThisYear - 1;

  if (LineDataLoading) {
    return (
      <div className="flex h-[530px] w-[65%] animate-pulse rounded-lg bg-gray-300"></div>
    );
  }

  return (
    <div className="flex h-[530px] w-[65%] flex-col justify-between rounded-lg border border-input pb-5 pr-5 pt-5 shadow-lg">
      <h1 className="ml-14 font-bold text-gray-600">Customers Analytics</h1>
      {/* Line Chart  */}
      {LineData && LineData.customersanalytics.length > 0 && (
        <div className="relative h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={LineData.customersanalytics.map((data: any) => ({
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

export default AdminLineCharts;
