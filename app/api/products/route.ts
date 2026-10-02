import { db } from "@/app/_lib/prisma";

// Apenas para referência

export async function GET() {
  const products = await db.peca.findMany({});
  return Response.json(products, {
    status: 200,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = body.name;
  const price = body.price;
  const stock = body.stock;
  await db.peca.create({
    data: {
      nome: name,
      valorVenda: price,
      quantidadeEstoque: stock,
    },
  });
  return Response.json({}, { status: 201 });
}
