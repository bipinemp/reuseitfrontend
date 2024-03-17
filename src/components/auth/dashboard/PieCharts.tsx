"use client";

import { usePieChartData } from "@/apis/queries";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const onPieEnter = () => {
  // Handle mouse enter event if needed
};

const PieCharts = () => {
  const { data, isPending } = usePieChartData();

  const valArr = data?.category_names.map((data: any) => data.value);

  const totalSum = valArr?.reduce(
    (prev: number, curr: number) => (prev += curr),
    0,
  );

  if (isPending) {
    return (
      <div className="h-[530px] w-[33%] animate-pulse rounded-lg bg-gray-300"></div>
    );
  }

  return (
    <div className="flex h-[530px] w-[33%] flex-col justify-between rounded-lg border border-input p-5 shadow-lg">
      {/* PieChart  */}
      <h1 className="text-center font-bold text-gray-600 underline underline-offset-2">
        Traffic
      </h1>
      {data && data.category_names && (
        <div className="relative mx-auto h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={200} height={200} onMouseEnter={onPieEnter}>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="w-fit rounded-lg border bg-background p-4 shadow-sm">
                        <div className="flex flex-col items-center">
                          <p className="text-[1rem] text-muted-foreground">
                            {payload[0].name}
                          </p>
                          <p className="font-bold">{payload[0].value}</p>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Pie
                data={data?.category_names}
                innerRadius={65}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data?.category_names.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <ScrollArea className="h-[120px] rounded-lg border border-gray-300">
        <div className="flex flex-col items-center gap-2">
          {data &&
            data.category_names &&
            data.category_names.map((data: any, i: number) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-1"
              >
                <p className="text-[0.9rem] font-semibold">{data.name}</p>
                <span className="text-[0.8rem]">
                  {(data.value / totalSum) * 100}%
                </span>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PieCharts;

// <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Furniture</p>
//           <span className="text-[0.8rem]">20%</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Clothing</p>
//           <span className="text-[0.8rem]">50%</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Electronics</p>
//           <span className="text-[0.8rem]">20%</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Books</p>
//           <span className="text-[0.8rem]">10%</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Cars</p>
//           <span className="text-[0.8rem]">13%</span>
//         </div>
//         <div className="flex flex-col items-center justify-center gap-1">
//           <p className="text-[0.9rem] font-semibold">Antiques</p>
//           <span className="text-[0.8rem]">10%</span>
//         </div>
