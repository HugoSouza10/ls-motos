"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { UpsertMotoSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertMoto = actionClient
  .schema(UpsertMotoSchema)
  .action(
    async ({
      parsedInput: { id, clienteId, modelo, placa, chassi, cor, ano, cilindrada },
    }) => {
      await db.moto.upsert({
        where: { id: id ?? "" },
        update: {
          clienteId: clienteId,
          modelo: modelo,
          placa: placa,
          chassi: chassi,
          cor: cor,
          ano: ano,
          cilindrada: cilindrada,
        },
        create: {
          clienteId: clienteId,
          modelo: modelo,
          placa: placa,
          chassi: chassi,
          cor: cor,
          ano: ano,
          cilindrada: cilindrada,
        },
      });
      revalidatePath("/motos", "page");
      revalidatePath("/");
    },
  );
