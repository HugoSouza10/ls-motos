"use client";

import type { MotoDto } from "@/app/_data-access/moto/get-motos";
import { ColumnDef } from "@tanstack/react-table";

export const motoTableColumns: ColumnDef<MotoDto>[] = [
  {
    accessorKey: "modelo",
    header: "Modelo",
  },
  {
    accessorKey: "placa",
    header: "Placa",
  },
  {
    accessorKey: "proprietario",
    header: "Proprietário",
  },
  {
    accessorKey: "cor",
    header: "Cor",
  },
  {
    accessorKey: "ano",
    header: "Ano",
    cell: ({ row }) => row.original.ano ?? "—",
  },
  {
    id: "actions",
    header: "Ações",
    cell: () => <span className="text-muted-foreground">—</span>,
  },
];
