"use client";

import { useBarChartData } from "@/apis/queries";

import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const BarCharts = () => {
  const { data: BarData, isPending: BarDataLoading } = useBarChartData();

  var ThisYear = new Date().getFullYear();
  var PrevYear = ThisYear - 1;

  const BarChartData = BarData?.analyticsData.map((data: any) => ({
    ...data,
    name: data.month,
  }));

  if (BarDataLoading) {
    return (
      <div className="h-[550px] w-full animate-pulse rounded-lg bg-gray-300"></div>
    );
  }

  return (
    <div className="flex h-[550px] w-full flex-col justify-between rounded-lg border border-input pb-7 pl-7 pr-7 pt-3 shadow-lg">
      <h1 className="font-bold text-gray-600">Sales</h1>
      {/*  Barchart  */}
      {BarData && BarData.analyticsData.length > 0 && (
        <div className="relative mx-auto h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={BarChartData}
              barGap={0}
              barSize={25}
              margin={{
                top: 5,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="w-[180px] rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground">
                              {PrevYear}
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] text-muted-foreground">
                              {ThisYear}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              {/* <Tooltip cursor={{ fill: "hsl(var(--muted))" }} /> */}
              <Legend />
              <Bar
                dataKey={PrevYear}
                fill="#74a7f7"
                legendType="square"
                //   activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
              <Bar
                dataKey={ThisYear}
                fill="hsl(var(--primary))"
                legendType="square"
                //   activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarCharts;
