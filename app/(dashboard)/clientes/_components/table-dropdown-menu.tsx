import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import UpsertClientDialogContent from "./upsert-dialog-content";
import { ClientDto } from "@/app/_data-access/cliente/getClientes";
import DeleteClientDialogContent from "./delete-dialog-content";

interface ClientTableDropdownMenuProps {
  client: ClientDto;
}

const ClientTableDropdownMenu = ({ client }: ClientTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogIsOpen] = useState(false);
  return (
    <AlertDialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-1.5"
              onClick={() => navigator.clipboard.writeText(client.id)}
            >
              <ClipboardCopyIcon size={16} />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <EditIcon size={16} />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">
                <TrashIcon size={16} />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertClientDialogContent
          defaultValues={{
            id: client.id,
            nome: client.nome,
            telefone: client.telefone,
            cpf: client.cpf ?? "",
            rua: client.rua,
            bairro: client.bairro,
            numero: client.numero,
            cidade: client.cidade,
            complemento: client.complemento ?? "",
            observacao: client.observacao ?? "",
          }}
          setDialogIsOpen={setEditDialogIsOpen}
        />
        <DeleteClientDialogContent clientId={client.id} />
      </Dialog>
    </AlertDialog>
  );
};

export default ClientTableDropdownMenu;
