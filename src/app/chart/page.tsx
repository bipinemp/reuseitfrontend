"use client";

import { useBarChartData, useLineChartData } from "@/apis/queries";
import { FC } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const piedata = [
  { name: "ELectronics", value: 10 },
  { name: "Furniture", value: 11 },
  { name: "Cars", value: 5 },
  { name: "Musics", value: 22 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface pageProps {}

const onPieEnter = () => {
  // Handle mouse enter event if needed
};

const Page: FC<pageProps> = ({}) => {
  const { data: BarData, isPending: BarDataLoading } = useBarChartData();
  const { data: LineData, isPending: LineDataLoading } = useLineChartData();

  var ThisYear = new Date().getFullYear();
  var PrevYear = ThisYear - 1;

  const BarChartData = BarData?.analyticsData.map((data: any) => ({
    name: data.month,
    [PrevYear]: data.previous_total_selling_price,
    [ThisYear]: data.current_total_selling_price,
  }));

  return (
    <div className="mx-auto mb-20 flex w-[1000px] flex-col gap-24">
      {/* Line Chart  */}
      {LineData && LineData.engagementData.length > 0 && (
        <div className="relative mx-auto h-[400px] w-[900px]">
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
              />
              <Line type="monotone" dataKey={PrevYear} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/*  Barchart  */}
      {BarData?.analyticsData && BarData?.analyticsData.length > 0 && (
        <div className="relative mx-auto h-[400px] w-[900px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={BarChartData}
              barGap={0}
              barSize={15}
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

      {/* PieChart  */}
      <div className="relative mx-auto h-[450px] w-[600px] border border-black">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={400} onMouseEnter={onPieEnter}>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="w-[150px] rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[1rem] text-muted-foreground">
                            {payload[0].name}
                          </span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              }}
            />
            <Pie
              data={piedata}
              innerRadius={65}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {piedata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;
