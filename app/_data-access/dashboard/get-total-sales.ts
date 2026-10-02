import "server-only";

export const getTotalSales = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // TODO: o schema atual não possui um model equivalente a venda.
  return 0;
};
