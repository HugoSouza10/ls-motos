import { z } from "zod";

export const upsertMotoSchema = z.object({
  id: z.string().uuid().optional(),
  clienteId: z.string().uuid(),
  modelo: z.string().min(1, "Informe o modelo."),
  placa: z.string().min(1, "Informe a placa."),
  chassi: z.string().min(1, "Informe o chassi."),
  cor: z.string().min(1, "Informe a cor."),
  ano: z.string().optional(),
  cilindrada: z.string().optional(),
});

export type UpsertMotoSchema = z.infer<typeof upsertMotoSchema>;
