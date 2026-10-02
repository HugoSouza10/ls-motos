import "server-only";

export const getTotalRevenue = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  // TODO: o schema atual não define venda nem uma regra de receita.
  return 0;
};
