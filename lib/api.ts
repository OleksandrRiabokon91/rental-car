import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
import { Car, CarsResp } from "./types";

// export async function GetCars() {
//   const res = await axios.get<CarsResp>("/cars");
//   return res.data;
// }

export const getCars = async (query = ""): Promise<CarsResp> => {
  const res = await axios.get(`/cars?${query}`); // GET всех машин
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
