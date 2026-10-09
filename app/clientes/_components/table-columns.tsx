"use client";

import { ColumnDef } from "@tanstack/react-table";
import ProductTableDropdownMenu from "./table-dropdown-menu";
import { ProductDto } from "@/app/_data-access/product/get-products";
import ProductStatusBadge from "@/app/_components/product-status-badge";
import { ClientDto } from "@/app/_data-access/cliente/getClientes";
import { formatCpf } from "@/app/_helpers/format-cpf";
import { formatTelefone } from "@/app/_helpers/format-telefone";

export const productTableColumns: ColumnDef<ClientDto>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
    cell: ({ row }) => formatTelefone(row.original.telefone),
  },
  {
    accessorKey: "cpf",
    header: "CPF",
    cell: ({ row }) => formatCpf(row.original.cpf),
  },
  {
    accessorKey: "cidade",
    header: "Cidade",
  },
  {
    accessorKey: "quantidadeMotos",
    header: "Motos",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
  },
];
