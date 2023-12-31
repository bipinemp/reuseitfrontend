"use client";

import { FC } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const bardata = [
  {
    name: "Jan",
    thisYear: 3000,
    lastYear: 2000,
  },
  {
    name: "Feb",
    thisYear: 2800,
    lastYear: 2100,
  },
  {
    name: "Mar",
    thisYear: 2500,
    lastYear: 1800,
  },
  {
    name: "Apr",
    thisYear: 3000,
    lastYear: 2400,
  },
  {
    name: "May",
    thisYear: 3500,
    lastYear: 2800,
  },
  {
    name: "Jun",
    thisYear: 4000,
    lastYear: 3200,
  },
  {
    name: "Jul",
    thisYear: 3800,
    lastYear: 3000,
  },
  {
    name: "Aug",
    thisYear: 4200,
    lastYear: 3500,
  },
  {
    name: "Sep",
    thisYear: 4600,
    lastYear: 4000,
  },
  {
    name: "Oct",
    thisYear: 5000,
    lastYear: 4500,
  },
  {
    name: "Nov",
    thisYear: 5400,
    lastYear: 5000,
  },
  {
    name: "Dec",
    thisYear: 5800,
    lastYear: 5500,
  },
];

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

const page: FC<pageProps> = ({}) => {
  return (
    <div className="mx-auto mb-20 flex w-[1000px] flex-col gap-24">
      <div className="relative mx-auto h-[400px] w-[900px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
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
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="relative mx-auto h-[400px] w-[900px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={bardata}
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
                            thisYear
                          </span>
                          <span className="font-bold">{payload[0].value}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] text-muted-foreground">
                            lastYear
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
              dataKey="thisYear"
              fill="hsl(var(--primary))"
              //   activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="lastYear"
              fill="hsl(var(--primary))"
              opacity={0.4}
              //   activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
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

export default page;
