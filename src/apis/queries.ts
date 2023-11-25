import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchAllProducts, getUserProfile } from "./apicalls";

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

// for fetching LoggedIn user Details
export const useUserProfile = () => {
  const { data, isPending } = useQuery<UserDetail>({
    queryKey: ["userprofile"],
    queryFn: getUserProfile,
  });

  return { data, isPending };
};
