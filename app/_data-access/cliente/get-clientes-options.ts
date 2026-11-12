import "server-only";
import { db } from "@/app/_lib/prisma";

export const getClientesOptions = async () => {
  return db.cliente.findMany({
    select: {
      id: true,
      nome: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
};