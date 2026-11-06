import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

const CreateMotoButton = () => {
  return (
    <Button className="gap-2" disabled>
      <PlusIcon size={20} />
      Nova Moto
    </Button>
  );
};

export default CreateMotoButton;
