-- DropForeignKey
ALTER TABLE "Moto" DROP CONSTRAINT "Moto_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "OrdemServico" DROP CONSTRAINT "OrdemServico_motoId_fkey";

-- AddForeignKey
ALTER TABLE "Moto" ADD CONSTRAINT "Moto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
