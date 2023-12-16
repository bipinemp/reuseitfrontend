import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  deleteMyProduct,
  fetchAllProducts,
  fetchMyProducts,
  getLatestMessageId,
  getMessagesList,
  getProductDetails,
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

// for fetching LoggedIn user Details
export const useUserProfile = () => {
  const { data, isPending, isSuccess } = useQuery<TUserDetail>({
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

// for getting users list for chatting
export const useGetUsersList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["userslist"],
    queryFn: getUsersList,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
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
        obj.queryKey[2] as number
      );

      return messages;
    },
  });

  return { data, isPending };
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
