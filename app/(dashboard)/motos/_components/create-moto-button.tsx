"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import UpsertMotoDialogContent from "./upsert-moto-dialog-content";


interface CreateMotoButtonProps {
  clientes: {
    id: string;
    nome: string;
  }[];
}

const CreateMotoButton = ({ clientes }: CreateMotoButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger>
        <Button className="gap-2">
          <PlusIcon size={20} />
          Nova Moto
        </Button>
      </DialogTrigger>
      <UpsertMotoDialogContent clientes={clientes} />
    </Dialog>
  );
};

export default CreateMotoButton;
