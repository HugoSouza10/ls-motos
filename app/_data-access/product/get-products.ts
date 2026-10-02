import "server-only";

import { db } from "@/app/_lib/prisma";
import { Peca } from "@prisma/client";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";

export interface ProductDto
  extends Pick<Peca, "id" | "createdAt" | "updatedAt"> {
  name: string;
  price: number;
  stock: number;
  status: ProductStatusDto;
}

export const getProducts = async (): Promise<ProductDto[]> => {
  const pecas = await db.peca.findMany({});
  return pecas.map((peca) => ({
    id: peca.id,
    name: peca.nome,
    price: Number(peca.valorVenda),
    stock: peca.quantidadeEstoque,
    createdAt: peca.createdAt,
    updatedAt: peca.updatedAt,
    status: peca.quantidadeEstoque > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
