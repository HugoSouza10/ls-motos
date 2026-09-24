// Adapter temporário: mantém todas as chamadas existentes compatíveis com o
// Prisma. Quando o banco estiver configurado, basta voltar este export para a
// instância real do PrismaClient e remover o arquivo mock-db.ts.

// import { PrismaClient } from "@prisma/client";


// const createPrismaClient = () => {
//   return new PrismaClient();
// };

// let prisma: ReturnType<typeof createPrismaClient>;
// if (process.env.NODE_ENV === "production") {
//   prisma = createPrismaClient();
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = createPrismaClient();
//   }
//   prisma = global.cachedPrisma;
// }

// export const db = prisma;

// import { PrismaClient } from "@prisma/client";

// const createPrismaClient = () => new PrismaClient();

// declare global {
//   // eslint-disable-next-line no-var
//   var cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
// }

// export const db =
//   process.env.NODE_ENV === "production"
//     ? createPrismaClient()
//     : (global.cachedPrisma ??= createPrismaClient());

//O código acima serve para chamar o prisma novamente

/*
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

*/

export { mockDb as db } from "./mock-db";
