import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../../_components/header";
import { DataTable } from "../../_components/ui/data-table";
import { getMotos } from "../../_data-access/moto/get-motos";
import CreateMotoButton from "./_components/create-moto-button";
import { motoTableColumns } from "./_components/table-columns";

const MotosPage = async () => {
  const motos = await getMotos();

  return (
    <div className="m-8 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de Motos</HeaderSubtitle>
          <HeaderTitle>Motos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateMotoButton />
        </HeaderRight>
      </Header>
      <DataTable columns={motoTableColumns} data={motos} />
    </div>
  );
};

export default MotosPage;
