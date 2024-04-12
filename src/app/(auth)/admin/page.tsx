"use client";

import { getAdminDash } from "@/apis/apicalls";
import DashboardContainer from "@/components/DashboardContainer";
import AdminLineCharts from "@/components/admin/AdminLineCharts";
import AdminPieCharts from "@/components/admin/AdminPieCharts";
import useFormatPrice from "@/hooks/useFormatPrice";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CircleDollarSign, Users } from "lucide-react";

const Page = () => {
  const { data: AdminDash, isPending: AdminDashPending } = useQuery({
    queryKey: ["admindash"],
    queryFn: getAdminDash,
  });

  const { formattedPrice } = useFormatPrice(+AdminDash?.revenue.Total! || 0);

  if (AdminDashPending) {
    return (
      <DashboardContainer>
        <div className="ml-[4.5rem] flex items-center gap-10">
          <div className="h-[220px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
          <div className="h-[220px] w-[300px] animate-pulse rounded-lg bg-gray-300"></div>
        </div>
      </DashboardContainer>
    );
  }

  console.log(AdminDash);
  return (
    <DashboardContainer>
      <div className="relative mb-10 flex w-full flex-col gap-10 px-14">
        <div className="flex items-center gap-10">
          <div className="flex h-[220px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-input px-8 py-4 shadow-lg">
            <div className="rounded-full bg-[#00C49F] p-5 text-white ">
              <Users className="h-10 w-10" />
            </div>
            <h2 className="font-bold text-gray-600">Total Users</h2>
            <p
              className={cn(
                "flex items-center gap-2 text-[1.3rem] font-semibold leading-3",
              )}
            >
              {AdminDash.users.Total}
            </p>
          </div>
          <div className="flex h-[220px] w-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-input px-8 py-4 shadow-lg">
            <div className="rounded-full bg-destructive p-5 text-white ">
              <CircleDollarSign className="h-10 w-10" />
            </div>
            <h2 className="font-bold text-gray-600">Revenue</h2>
            <p className="text-[1.3rem] font-semibold leading-3 text-gray-500">
              {formattedPrice}
            </p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <AdminLineCharts />
          <AdminPieCharts />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Page;
