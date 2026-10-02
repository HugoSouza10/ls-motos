import "server-only";
import { ProductStatusDto } from "../product/get-products";

export interface MostSoldProductDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // TODO: o schema atual não possui vendas para calcular este ranking.
  return [];
};
