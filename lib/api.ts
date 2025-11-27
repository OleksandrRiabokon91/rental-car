import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
import { CarsResp } from "./types";

export async function GetCars() {
  const res = await axios.get<CarsResp>("/cars");
  return res.data;
}
