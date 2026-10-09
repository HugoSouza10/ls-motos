"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertClientSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertClient = actionClient
  .schema(upsertClientSchema)
  .action(async ({ parsedInput: { id, nome, telefone, cpf, rua, bairro, numero, cidade, complemento, observacao } }) => {
    await db.cliente.upsert({
      where: { id: id ?? "" },
      update: {
        nome: nome,
        telefone: telefone,
        cpf: cpf,
        rua: rua,
        bairro: bairro,
        numero: numero,
        cidade: cidade,
        complemento: complemento,
        observacao: observacao,
      },
      create: {
        nome: nome,
        telefone: telefone,
        cpf: cpf,
        rua: rua,
        bairro: bairro,
        numero: numero,
        cidade: cidade,
        complemento: complemento,
        observacao: observacao,
      },
    });
    revalidatePath("/clientes", "page");
    revalidatePath("/");
  });
