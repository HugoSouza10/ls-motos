import "server-only";
import { db } from "@/app/_lib/prisma";
import { Cliente } from "@prisma/client";


// Criamos um pick para pegar apenas os campos que queremos do cliente,
//  e adicionamos o campo quantidadeMotos que é a quantidade de motos que o 
// cliente possui
export interface ClientDto
  extends Pick<
    Cliente,
    "id" | "nome" | "telefone" | "cpf" | "cidade" | "bairro"
  > {
  quantidadeMotos: number;
}

//Pegando todos os clientes do banco de dados
export const getClientes = async (): Promise<ClientDto[]> => {
  const clientes = await db.cliente.findMany({
    include: {
      _count: {
        select: {
          motos: true,
        },
      },
    },
  });

  return clientes.map((cliente) => ({
    id: cliente.id,
    nome: cliente.nome,
    telefone: cliente.telefone,
    cpf: cliente.cpf,
    cidade: cliente.cidade,
    bairro: cliente.bairro,
    quantidadeMotos: cliente._count.motos,
  }));
};
