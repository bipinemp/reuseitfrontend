"use client";

import { useFetchAllMyProducts } from "@/apis/queries";
import DashboardContainer from "@/components/DashboardContainer";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteMyProduct, formatDate } from "@/apis/apicalls";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Trash } from "lucide-react";
import clsx from "clsx";
import ProdTableLoading from "@/loading/ProdTableLoading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const page: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useFetchAllMyProducts();

  const { mutate: DeleteProduct } = useMutation({
    mutationFn: deleteMyProduct,
    onSuccess: () => {
      toast.success("Product Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["myproducts"] });
    },
  });

  const content = data?.pages.map((products) => {
    return (
      <TableBody className="relative w-full">
        {products &&
          products?.map((product: Product) => {
            const formattedDate = formatDate(product.created_at || "");
            const title =
              product.pname.length >= 30
                ? product.pname.substring(0, 30) + "..."
                : product.pname;

            return (
              <TableRow key={product.id} className="text-content">
                <TableCell className="font-medium">
                  <p title={product.pname.length >= 30 ? product.pname : ""}>
                    {title}
                  </p>
                </TableCell>
                <TableCell>{product.category.category_name}</TableCell>
                <TableCell>NPR. {product.price}</TableCell>
                <TableCell
                  className="text-left
              "
                >
                  <span
                    className={clsx(
                      "font-semibold py-[0.3rem] px-3 rounded-full text-white",
                      {
                        "bg-primary": product.status === 1,
                        "bg-gray-500": product.status === 0,
                      }
                    )}
                  >
                    {product.status === 0 ? "Progress" : "Sold Out"}
                  </span>
                </TableCell>
                <TableCell className="text-center">{formattedDate}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button size="sm">
                          <Edit className="w-4 h-4" strokeWidth={2} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Product</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button size="sm" variant="destructive">
                              <Trash className="w-4 h-4" strokeWidth={2} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Product</p>
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
                          This action cannot be undone. This will permanently
                          DELETE your product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => DeleteProduct(product.id)}
                          className="bg-destructive hover:bg-destructive hover:opacity-80"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    );
  });

  return (
    <DashboardContainer>
      <div className="w-[1000px] mx-auto flex flex-col gap-5 mb-20">
        <div>
          <h1 className="font-bold text-gray-600">Products</h1>
        </div>
        {status === "pending" ? (
          <ProdTableLoading />
        ) : (
          <Table className="relative w-full">
            {/* <TableCaption>Your Products</TableCaption> */}
            <TableHeader className="bg-neutral-100">
              <TableRow className="font-semibold text-[1.1rem">
                <TableHead className="w-[290px] text-black/80">
                  Product Name
                </TableHead>
                <TableHead className="w-[230px] text-black/80">
                  Category
                </TableHead>
                <TableHead className="w-[150px] text-black/80">Price</TableHead>
                <TableHead className="w-[80px] text-black/80">Status</TableHead>
                <TableHead className="w-[150px] text-black/80">
                  Created Date
                </TableHead>
                <TableHead className="w-[100px] text-black/80">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            {content}

            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} className="text-right">
                  <Button
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    variant="default"
                    className=""
                  >
                    {isFetchingNextPage ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                      </div>
                    ) : hasNextPage ? (
                      "Load More"
                    ) : (
                      "Nothing to Load"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </DashboardContainer>
  );
};

export default page;
