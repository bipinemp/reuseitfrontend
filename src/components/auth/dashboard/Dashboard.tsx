"use client";

import DashboardContainer from "@/components/DashboardContainer";
import LineCharts from "./LineCharts";
import BarCharts from "./BarCharts";
import PieCharts from "./PieCharts";

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <div className="relative mb-10 flex w-full flex-col gap-10 px-14">
        <div className="flex w-full items-center justify-between">
          <LineCharts />
          <PieCharts />
        </div>
        <BarCharts />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
