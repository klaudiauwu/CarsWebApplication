export interface Car {
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  id: string;
  engineCapacity: number;
  fuelType: number;
  productionDate: string;
  averageFuelConsumption: number;
  bodyType: number;
}

export type NewCar = Omit<Car, 'id'>;