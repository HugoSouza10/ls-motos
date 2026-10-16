import { deleteClient } from "@/app/_actions/client/delete-client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface DeleteClientDialogContentProps {
  clientId: string;
}

const DeleteClientDialogContent = ({
  clientId,
}: DeleteClientDialogContentProps) => {
  const { execute: executeDeleteClient } = useAction(deleteClient, {
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso.");
    },
    onError: ({ error }) => {
      toast.error(error.serverError ?? "Ocorreu um erro ao excluir o cliente.");
    },
  });
  const handleContinueClick = () => executeDeleteClient({ id: clientId });
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este cliente. Esta ação não pode ser
          desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteClientDialogContent;
