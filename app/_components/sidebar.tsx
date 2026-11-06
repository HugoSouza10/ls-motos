import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white">
      {/* IMAGEM */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">LS MOTOS</h1>
      </div>
      {/* BOTÕES */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/clientes">
          <PackageIcon size={20} />
          Clientes
        </SidebarButton>

        <SidebarButton href="/motos">
          <ShoppingBasketIcon size={20} />
          Motos
        </SidebarButton>

        <Button variant="ghost" className="justify-start gap-2" disabled>
          <ShoppingBasketIcon size={20} />
          Abrir O.S
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
