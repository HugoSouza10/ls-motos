"use client";

import { upsertClient } from "@/app/_actions/client/upsert-client";
import {
  UpsertClientSchema,
  upsertClientSchema,
} from "@/app/_actions/client/upsert-client/schema";
import { PatternFormat } from "react-number-format";

import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UpsertClientDialogContentProps {
  defaultValues?: UpsertClientSchema;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
}

const UpsertClientDialogContent = ({
  defaultValues,
  setDialogIsOpen,
}: UpsertClientDialogContentProps) => {
  const { execute: executeUpsertClient } = useAction(upsertClient, {
    onSuccess: () => {
      toast.success("Cliente salvo com sucesso.");
      setDialogIsOpen(false);
    },
    onError: () => {
      toast.error("Ocorreu um erro ao salvar o cliente.");
    },
  });
  // Criar o formulário com react-hook-form e zod
  const form = useForm<UpsertClientSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertClientSchema),
    defaultValues: defaultValues ?? {
      id: "",
      nome: "",
      telefone: "",
      cpf: "",
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      complemento: "",
      observacao: "",
    },
  });

  const onSubmit = (data: UpsertClientSchema) => {
    console.log("data", data);
    executeUpsertClient({ ...data, id: defaultValues?.id });
  };

  const isEditing = !!defaultValues;

  return (
    <DialogContent className="sm:max-w-2xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar" : "Criar"} cliente</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="(##) #####-####"
                    mask="_"
                    customInput={Input}
                    placeholder="00000-0000"
                    value={field.value ?? ""}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="###.###.###-##"
                    mask="_"
                    customInput={Input}
                    placeholder="000.000.000-00"
                    value={field.value ?? ""}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a rua do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o bairro do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <PatternFormat
                    format="######"
                    allowEmptyFormatting={false}
                    customInput={Input}
                    value={field.value ?? ""}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a cidade do cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o complemento do cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="grid grid-cols-2 gap-2 md:col-span-2">
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16} />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertClientDialogContent;
