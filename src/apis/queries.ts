import axios from "axios";

// for fetcing all Products
export const fetchAllProducts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getdat?page=${pageParam}&limit=10`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
