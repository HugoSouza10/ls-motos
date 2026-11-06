import "server-only";

import { db } from "@/app/_lib/prisma";
import type { Moto } from "@prisma/client";

export interface MotoDto
  extends Pick<Moto, "id" | "modelo" | "placa" | "cor" | "ano"> {
  proprietario: string;
}

export const getMotos = async (): Promise<MotoDto[]> => {
  const motos = await db.moto.findMany({
    include: {
      cliente: {
        select: {
          nome: true,
        },
      },
    },
  });

  return motos.map((moto) => ({
    id: moto.id,
    modelo: moto.modelo,
    placa: moto.placa,
    proprietario: moto.cliente.nome,
    cor: moto.cor,
    ano: moto.ano,
  }));
};
