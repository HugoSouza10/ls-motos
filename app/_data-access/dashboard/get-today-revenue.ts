import "server-only";

export const getTodayRevenue = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // TODO: o schema atual não define venda nem uma regra de receita.
  return 0;
};
