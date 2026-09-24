import "server-only";

import { randomUUID } from "crypto";

interface ProductRecord {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SaleRecord {
  id: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface SaleProductRecord {
  id: string;
  saleId: string;
  productId: string;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MockState {
  products: ProductRecord[];
  sales: SaleRecord[];
  saleProducts: SaleProductRecord[];
}

const dateAtOffset = (daysAgo: number, hour = 12) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const createInitialState = (): MockState => {
  const createdAt = dateAtOffset(30, 9);
  const productSeeds: Array<[string, string, number, number]> = [
    ["11111111-1111-4111-8111-111111111111", "Capacete Pro Tork", 189.9, 14],
    ["22222222-2222-4222-8222-222222222222", "Luva X11 Fit", 119.9, 22],
    ["33333333-3333-4333-8333-333333333333", "Óleo Motul 10W40", 64.9, 35],
    ["44444444-4444-4444-8444-444444444444", "Kit Relação DID", 389.9, 8],
    ["55555555-5555-4555-8555-555555555555", "Capa de Chuva", 149.9, 17],
    ["66666666-6666-4666-8666-666666666666", "Baú 45 Litros", 499.9, 0],
  ];
  const products = productSeeds.map(
    ([id, name, price, stock]): ProductRecord => ({
      id,
      name,
      price,
      stock,
      createdAt,
      updatedAt: createdAt,
    }),
  );

  const saleSeeds: Array<{
    id: string;
    daysAgo: number;
    items: Array<[number, number]>;
  }> = [
    { id: "a1111111-1111-4111-8111-111111111111", daysAgo: 0, items: [[0, 1], [2, 2]] },
    { id: "a2222222-2222-4222-8222-222222222222", daysAgo: 1, items: [[1, 2]] },
    { id: "a3333333-3333-4333-8333-333333333333", daysAgo: 3, items: [[2, 4], [4, 1]] },
    { id: "a4444444-4444-4444-8444-444444444444", daysAgo: 5, items: [[3, 1]] },
    { id: "a5555555-5555-4555-8555-555555555555", daysAgo: 7, items: [[0, 1], [1, 1]] },
    { id: "a6666666-6666-4666-8666-666666666666", daysAgo: 10, items: [[2, 3]] },
    { id: "a7777777-7777-4777-8777-777777777777", daysAgo: 12, items: [[4, 2]] },
  ];
  const sales: SaleRecord[] = [];
  const saleProducts: SaleProductRecord[] = [];

  for (const seed of saleSeeds) {
    const date = dateAtOffset(seed.daysAgo);
    sales.push({ id: seed.id, date, createdAt: date, updatedAt: date });
    seed.items.forEach(([productIndex, quantity]) => {
      const product = products[productIndex];
      saleProducts.push({
        id: randomUUID(),
        saleId: seed.id,
        productId: product.id,
        unitPrice: product.price,
        quantity,
        createdAt: date,
        updatedAt: date,
      });
    });
  }

  return { products, sales, saleProducts };
};

const clone = <T>(value: T): T => structuredClone(value);

class MockDb {
  constructor(private state: MockState) {}

  product = {
    findMany: async (args: unknown = {}) => {
      void args;
      return clone(this.state.products);
    },
    findUnique: async ({ where: { id } }: { where: { id: string } }) => {
      const product = this.state.products.find((item) => item.id === id);
      return product ? clone(product) : null;
    },
    count: async () => this.state.products.length,
    aggregate: async (args: unknown) => {
      void args;
      return {
        _sum: {
          stock: this.state.products.reduce(
            (total, product) => total + product.stock,
            0,
          ),
        },
      };
    },
    create: async ({
      data,
    }: {
      data: Pick<ProductRecord, "name" | "price" | "stock">;
    }) => {
      const now = new Date();
      const product: ProductRecord = {
        ...data,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      this.state.products.push(product);
      return clone(product);
    },
    upsert: async ({
      where: { id },
      update,
      create,
    }: {
      where: { id: string };
      update: Pick<ProductRecord, "name" | "price" | "stock">;
      create: Pick<ProductRecord, "name" | "price" | "stock">;
    }) => {
      const existing = this.state.products.find((item) => item.id === id);
      if (existing) {
        Object.assign(existing, update, { updatedAt: new Date() });
        return clone(existing);
      }
      return this.product.create({ data: create });
    },
    update: async ({
      where: { id },
      data,
    }: {
      where: { id: string };
      data: {
        stock?: { increment?: number; decrement?: number };
      };
    }) => {
      const product = this.state.products.find((item) => item.id === id);
      if (!product) throw new Error("Product not found.");
      product.stock += data.stock?.increment ?? 0;
      product.stock -= data.stock?.decrement ?? 0;
      product.updatedAt = new Date();
      return clone(product);
    },
    delete: async ({ where: { id } }: { where: { id: string } }) => {
      const product = this.state.products.find((item) => item.id === id);
      if (!product) throw new Error("Product not found.");
      this.state.products = this.state.products.filter((item) => item.id !== id);
      this.state.saleProducts = this.state.saleProducts.filter(
        (item) => item.productId !== id,
      );
      return clone(product);
    },
  };

  sale = {
    findMany: async (args: unknown = {}) => {
      void args;
      return clone(
        this.state.sales
          .map((sale) => ({
            ...sale,
            saleProducts: this.state.saleProducts
              .filter((item) => item.saleId === sale.id)
              .map((item) => ({
                ...item,
                product: this.state.products.find(
                  (product) => product.id === item.productId,
                )!,
              })),
          }))
          .sort((a, b) => b.date.getTime() - a.date.getTime()),
      );
    },
    findUnique: async ({
      where: { id },
    }: {
      where: { id: string | undefined };
      include?: unknown;
    }) => {
      const sale = this.state.sales.find((item) => item.id === id);
      if (!sale) return null;
      return clone({
        ...sale,
        saleProducts: this.state.saleProducts.filter(
          (item) => item.saleId === id,
        ),
      });
    },
    count: async () => this.state.sales.length,
    create: async ({ data: { date } }: { data: { date: Date } }) => {
      const now = new Date();
      const sale: SaleRecord = {
        id: randomUUID(),
        date,
        createdAt: now,
        updatedAt: now,
      };
      this.state.sales.push(sale);
      return clone(sale);
    },
    delete: async ({
      where: { id },
    }: {
      where: { id: string | undefined };
    }) => {
      const sale = this.state.sales.find((item) => item.id === id);
      if (!sale) throw new Error("Sale not found.");
      this.state.sales = this.state.sales.filter((item) => item.id !== id);
      this.state.saleProducts = this.state.saleProducts.filter(
        (item) => item.saleId !== id,
      );
      return clone(sale);
    },
  };

  saleProduct = {
    create: async ({
      data,
    }: {
      data: Pick<
        SaleProductRecord,
        "saleId" | "productId" | "quantity" | "unitPrice"
      >;
    }) => {
      const now = new Date();
      const saleProduct: SaleProductRecord = {
        ...data,
        id: randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      this.state.saleProducts.push(saleProduct);
      return clone(saleProduct);
    },
  };

  async $transaction<T>(operation: (transaction: MockDb) => Promise<T>) {
    const snapshot = clone(this.state);
    try {
      return await operation(this);
    } catch (error) {
      this.state = snapshot;
      throw error;
    }
  }

  async $queryRawUnsafe<T>(query: string, ...parameters: unknown[]): Promise<T> {
    if (query.includes('ORDER BY "totalSold"')) {
      const products = this.state.products
        .map((product) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          totalSold: this.state.saleProducts
            .filter((item) => item.productId === product.id)
            .reduce((total, item) => total + item.quantity, 0),
        }))
        .filter((product) => product.totalSold > 0)
        .sort((a, b) => b.totalSold - a.totalSold)
        .slice(0, 5);
      return products as T;
    }

    const start = parameters[0] instanceof Date ? parameters[0] : undefined;
    const end = parameters[1] instanceof Date ? parameters[1] : undefined;
    const saleIds = new Set(
      this.state.sales
        .filter((sale) => (!start || sale.date >= start) && (!end || sale.date <= end))
        .map((sale) => sale.id),
    );
    const revenue = this.state.saleProducts
      .filter((item) => saleIds.has(item.saleId))
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    if (query.includes('as "todayRevenue"')) {
      return [{ todayRevenue: revenue }] as T;
    }
    return [{ totalRevenue: revenue }] as T;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var stocklyMockDb: MockDb | undefined;
}

export const mockDb = global.stocklyMockDb ?? new MockDb(createInitialState());

if (process.env.NODE_ENV !== "production") global.stocklyMockDb = mockDb;
