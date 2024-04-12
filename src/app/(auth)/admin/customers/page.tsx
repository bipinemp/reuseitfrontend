"use client";

import { blockCustomer, getCustomersList } from "@/apis/apicalls";
import DashboardContainer from "@/components/DashboardContainer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductDetailsLoading } from "@/loading/ProductDetailsLoading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldBan } from "lucide-react";
import toast from "react-hot-toast";

const Page = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["customerslist"],
    queryFn: getCustomersList,
  });

  const { mutate } = useMutation({
    mutationFn: blockCustomer,
    onSuccess(data) {
      if (data[1] === "Has been blocked") {
        toast.success("User is Blocked");
        queryClient.invalidateQueries({ queryKey: ["customerslist"] });
      }
    },
  });

  const handleBlockUser = (id: string) => {
    mutate(id);
  };

  if (isPending) {
    return <ProductDetailsLoading />;
  }
  return (
    <DashboardContainer>
      <div className="flex flex-col gap-y-10 px-14">
        <h1 className="font-black opacity-80">Customers</h1>
        <div>
          {data &&
            data?.customers?.map((user: TUserDetail) => (
              <div
                key={user.id}
                className="relative overflow-x-auto shadow-md sm:rounded-lg"
              >
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {user.name}
                      </th>
                      <td className="px-6 py-4">{user.email}</td>

                      <td className="px-6 py-4">
                        {user.isBlocked === 1 ? (
                          <Button
                            variant={"destructive"}
                            className="flex items-center gap-2"
                          >
                            <ShieldBan className="size-5" /> Blocked
                          </Button>
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Button
                                      variant={"destructive"}
                                      className="flex items-center gap-2"
                                    >
                                      <ShieldBan className="size-5" /> Block
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Block The User</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will Block
                                  the User.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleBlockUser(user?.id.toString())
                                  }
                                  className="bg-destructive hover:bg-destructive hover:opacity-80"
                                >
                                  Block
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Page;
