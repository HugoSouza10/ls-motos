"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, name, price, stock } }) => {
    await db.peca.upsert({
      where: { id: id ?? "" },
      update: {
        nome: name,
        valorVenda: price,
        quantidadeEstoque: stock,
      },
      create: {
        nome: name,
        valorVenda: price,
        quantidadeEstoque: stock,
      },
    });
    revalidatePath("/products", "page");
    revalidatePath("/");
  });
