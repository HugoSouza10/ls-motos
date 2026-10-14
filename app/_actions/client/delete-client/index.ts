"use server";

import { db } from "@/app/_lib/prisma";
import { deleteClientSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";

export const deleteClient = actionClient
  .schema(deleteClientSchema)
  .action(async ({ parsedInput: { id } }) => {
    const quantidadeMotos = await db.moto.count({
      where: {
        clienteId: id,
      },
    });
    if (quantidadeMotos > 0) {
      throw new Error(
        "Não é possível excluir um cliente que possui motos cadastradas.",
      );
    }
    await db.cliente.delete({
      where: {
        id,
      },
    });
    revalidatePath("/clientes", "page");
  });
