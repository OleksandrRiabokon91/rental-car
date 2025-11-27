export type Car = {
  id: string; // UUID
  year: number;
  brand: string;
  model: string;
  type: string; // SUV, Sedan, etc.
  img: string; // URL
  description: string;
  fuelConsumption: string; // можно заменить на number, если планируешь математические операции
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // можно number, если цена числовая
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
};

export type CarsResp = {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
};
