"use client";

import {
  type UpsertMotoSchema,
  upsertMotoSchema,
} from "@/app/_actions/client/upsert-moto/schema";
import { Button } from "@/app/_components/ui/button";
import { Combobox } from "@/app/_components/ui/combobox";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UpsertMotoDialogContentProps {
  defaultValues?: UpsertMotoSchema;
  clientes: {
    id: string;
    nome: string;
  }[];
}

const UpsertMotoDialogContent = ({
  defaultValues,
  clientes,
}: UpsertMotoDialogContentProps) => {
  // Criar o formulário com react-hook-form e zod
  const form = useForm<UpsertMotoSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertMotoSchema),
    defaultValues: defaultValues ?? {
      clienteId: "",
      modelo: "",
      placa: "",
      chassi: "",
      cor: "",
      ano: "",
      cilindrada: "",
    },
  });

  const clienteOptions = clientes.map((cliente) => ({
    value: cliente.id,
    label: cliente.nome,
  }));
  const onSubmit = (data: UpsertMotoSchema) => {
    console.log(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar Nova Moto</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para criar uma nova moto.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Campos do formulário */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Proprietário */}
            <FormField
              control={form.control}
              name="clienteId"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Proprietário *</FormLabel>
                  <FormControl>
                    <Combobox
                      placeholder="Selecione um cliente"
                      options={clienteOptions}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Modelo */}
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Honda CG 160" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Placa */}
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.: ABC1D23"
                      maxLength={7}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Chassi */}
            <FormField
              control={form.control}
              name="chassi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chassi *</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o chassi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cor */}
            <FormField
              control={form.control}
              name="cor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Vermelha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ano */}
            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex.: 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cilindrada */}
            <FormField
              control={form.control}
              name="cilindrada"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cilindrada</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex.: 160" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Salvar Moto</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertMotoDialogContent;
