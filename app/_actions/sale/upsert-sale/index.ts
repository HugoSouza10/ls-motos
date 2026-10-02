"use server";

import { upsertSaleSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async () => {
    // TODO: não existe model de venda no schema atual. Não criar uma
    // OrdemServico sem motoId, problema e demais dados obrigatórios.
    throw new Error("Operação de venda indisponível no schema atual.");
  });
