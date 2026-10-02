import "server-only";
import { db } from "@/app/_lib/prisma";

export const getTotalInStock = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const totalStock = await db.peca.aggregate({
    _sum: {
      quantidadeEstoque: true,
    },
  });
  return Number(totalStock._sum.quantidadeEstoque ?? 0);
};
