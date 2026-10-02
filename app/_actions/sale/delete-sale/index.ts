"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async () => {
    // TODO: não existe model de venda no schema atual.
    throw new Error("Operação de venda indisponível no schema atual.");
  });
