import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  deleteMyProduct,
  fetchAllProducts,
  fetchMyProducts,
  getBarChartData,
  getCategoriesList,
  getCategoryDetails,
  getCount,
  getDashData,
  getLatestMessageId,
  getLineChartData,
  getMessagesList,
  getPieChartData,
  getProductDetails,
  getProductsForPackages,
  getUserDetails,
  getUserProfile,
  getUsersList,
  postUserIdFromProductDetailsPage,
} from "./apicalls";
import { MsgData } from "@/app/(auth)/user/[id]/page";

export const useFetchAllProducts = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
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
    isPending,
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

// for fetching product details for updating product
export const useViewProductDetails = (id: number) => {
  const { data, isPending } = useQuery({
    queryKey: ["productdetails", id],
    queryFn: (obj) => {
      const prodDetails = getProductDetails(obj.queryKey[1] as number);
      return prodDetails;
    },
  });

  return { data, isPending };
};

// for fetching categories list
export const useCategoriesList = () => {
  const { data, isPending, isSuccess } = useQuery<TCategories[]>({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
  });

  return { data, isPending, isSuccess };
};

// for fetching LoggedIn user Details
export const useUserProfile = () => {
  const { data, isPending, isSuccess } = useQuery<TUserDetail>({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });

  return { data, isPending, isSuccess };
};

// for fetching LoggedIn user Details
export const useCategoryDetails = (id: number) => {
  const { data, isPending } = useQuery<TCategories>({
    queryKey: ["categoryDetails", id],
    queryFn: (obj) => {
      const prodDetails = getCategoryDetails(obj.queryKey[1] as number);
      return prodDetails;
    },
    staleTime: 10 * 60 * 1000,
  });

  return { data, isPending };
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

// for getting users list for chatting
export const useGetUsersList = () => {
  const { data, isPending } = useQuery<UserType[]>({
    queryKey: ["userslist"],
    queryFn: getUsersList,
    staleTime: 5000,
    refetchInterval: 5000,
  });

  return { data, isPending };
};

// for getting users list for chatting
export const useGetChatCount = () => {
  const { data, isPending } = useQuery<CountChatType>({
    queryKey: ["userchatcount"],
    queryFn: getCount,
    staleTime: 5000,
    refetchInterval: 5000,
  });

  return { data, isPending };
};

// for getting users list for chatting
export const useGetLatestMessageId = () => {
  const { data, isPending } = useQuery({
    queryKey: ["messageId"],
    queryFn: getLatestMessageId,
  });

  return { data, isPending };
};

// for getting user details chatting
export const useGetUserDetails = (id: number) => {
  const { data, isPending } = useQuery<TUserDetail>({
    queryKey: ["userdetailchat", id],
    queryFn: (obj) => {
      const userDetails = getUserDetails(obj.queryKey[1] as number);
      return userDetails;
    },
  });

  return { data, isPending };
};

// for getting user details in time interval for chatting
export const useGetUserDataInInterval = (id: number) => {
  const { data, isPending } = useQuery<TUserDetail>({
    queryKey: ["userdetailchat", id],
    queryFn: (obj) => {
      const userDetails = getUserDetails(obj.queryKey[1] as number);
      return userDetails;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });

  return { data, isPending };
};

// for gettign users latest messages
export const useGetLatestMessages = (senderId: number, id: number) => {
  const { data, isPending } = useQuery<MsgData[]>({
    queryKey: ["latestmessages", senderId, id],
    queryFn: (obj) => {
      const messages = getMessagesList(
        obj.queryKey[1] as number,
        obj.queryKey[2] as number,
      );

      return messages;
    },
  });

  return { data, isPending };
};

// Analytics Data querying
export const useBarChartData = () => {
  const { data, isPending } = useQuery({
    queryKey: ["barchart"],
    queryFn: getBarChartData,
  });

  return { data, isPending };
};

export const useLineChartData = () => {
  const { data, isPending } = useQuery({
    queryKey: ["linechart"],
    queryFn: getLineChartData,
  });

  return { data, isPending };
};

export const usePieChartData = () => {
  const { data, isPending } = useQuery({
    queryKey: ["piechart"],
    queryFn: getPieChartData,
  });

  return { data, isPending };
};

export const useDashData = () => {
  const { data, isPending } = useQuery<TDashData>({
    queryKey: ["dashdata"],
    queryFn: getDashData,
  });

  return { data, isPending };
};

export const useProductsPackages = (packSelected: boolean) => {
  const { data, isPending, fetchStatus } = useQuery<TPackProds[]>({
    queryKey: ["prodspackages"],
    queryFn: getProductsForPackages,
    enabled: packSelected,
    refetchInterval: 86400000,
  });

  return { data, isPending, fetchStatus };
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
