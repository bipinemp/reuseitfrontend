"use client";

import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const piedata = [
  { name: "ELectronics", value: 10 },
  { name: "Furniture", value: 11 },
  { name: "Cars", value: 5 },
  { name: "Musics", value: 22 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const onPieEnter = () => {
  // Handle mouse enter event if needed
};

const PieCharts = () => {
  return (
    <div className="flex h-[440px] w-[33%] flex-col gap-5 rounded-lg  border border-input p-5 shadow-lg">
      {/* PieChart  */}
      <div className="relative mx-auto h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={200} height={200} onMouseEnter={onPieEnter}>
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
      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Furniture</p>
          <span className="text-[0.8rem]">20%</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Clothing</p>
          <span className="text-[0.8rem]">50%</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Electronics</p>
          <span className="text-[0.8rem]">20%</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Books</p>
          <span className="text-[0.8rem]">10%</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Cars</p>
          <span className="text-[0.8rem]">13%</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-[0.9rem] font-semibold">Antiques</p>
          <span className="text-[0.8rem]">10%</span>
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
