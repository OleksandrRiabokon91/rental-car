import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
import { Car, CarsResp } from "./types";

// export async function GetCars() {
//   const res = await axios.get<CarsResp>("/cars");
//   return res.data;
// }

export const getCars = async (
  params: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
    limit?: string;
    page?: string;
  } = {}
): Promise<CarsResp> => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();

  const res = await axios.get(`/cars?${queryString}`);
  return res.data;
};
// export const getCars = async () => {
//   const res = await axios.get();
//   return res.data;
// };

export const getCarById = async (id: string): Promise<Car> => {
  const res = await axios.get(`/cars/${id}`);
  return res.data;
};

export const getBrands = async (): Promise<string[]> => {
  const res = await axios.get("/brands");
  return res.data;
};
