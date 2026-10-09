import { z } from "zod";

//Validações zod para o formulário de criação/edição de clientes
export const upsertClientSchema = z.object({
  id: z.string().uuid().optional(),

  nome: z.string().trim().min(1, {
    message: "O nome do cliente é obrigatório.",
  }),

  telefone: z
    .string()
    .trim()
    .regex(/^\d{11}$/, {
      message: "Telefone inválido.",
    }),

  cpf: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d{11}$/.test(value), {
      message: "CPF inválido.",
    })
    .optional(),

  rua: z.string().trim().min(1, {
    message: "A rua é obrigatória.",
  }),

  bairro: z.string().trim().min(1, {
    message: "O bairro é obrigatório.",
  }),

  numero: z.string().trim().regex(/^\d+$/, {
    message: "Informe apenas números.",
  }),

  cidade: z.string().trim().min(1, {
    message: "A cidade é obrigatória.",
  }),

  complemento: z.string().trim().optional(),
  observacao: z.string().trim().optional(),
});

export type UpsertClientSchema = z.infer<typeof upsertClientSchema>;
