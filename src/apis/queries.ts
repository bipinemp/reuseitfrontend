import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  deleteMyProduct,
  fetchAllProducts,
  fetchMyProducts,
  getProductDetails,
  getUserProfile,
  postUserIdFromProductDetailsPage,
} from "./apicalls";

export const useFetchAllProducts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

// for fetching product Details
export const useProductDetails = (id: number, user_id: number | null) => {
  const { data, isPending } = useQuery({
    queryKey: ["productdetails", id],
    queryFn: (obj) => {
      const prodDetails = getProductDetails(obj.queryKey[1] as number);
      postUserIdFromProductDetailsPage(obj.queryKey[1] as number, user_id);

      return prodDetails;
    },
  });

  return { data, isPending };
};

// for fetching LoggedIn user Details
export const useUserProfile = () => {
  const { data, isPending, isSuccess } = useQuery<UserDetail>({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });

  return { data, isPending, isSuccess };
};

// Dashboard
// for fetching my products
export const useFetchAllMyProducts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["myproducts"],
    queryFn: fetchMyProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

// for deleting product
// export const useProductDelete = (id: number) => {
//   const { data, isPending } = useQuery({
//     queryKey: ["productdetails", id],
//     queryFn: (obj) => {
//       deleteMyProduct(obj.queryKey[1] as number);
//     },
//   });

//   return { data, isPending };
// };
