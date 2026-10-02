import "server-only";

interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface SaleDto {
  id: string;
  productNames: string;
  totalProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}

export const getSales = async (): Promise<SaleDto[]> => {
  // TODO: não existe model de venda no schema atual e OrdemServico exige
  // dados obrigatórios que não possuem equivalência segura nesta tela.
  return [];
};
