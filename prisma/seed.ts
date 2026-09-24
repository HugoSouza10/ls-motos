const {
  Prisma,
  PrismaClient,
  StatusOrdemServico,
} = require("@prisma/client");

const prisma = new PrismaClient();

const clientes = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    nome: "Ana Paula Souza",
    telefone: "(85) 99911-2233",
    cpf: "123.456.789-01",
    rua: "Rua das Flores",
    bairro: "Aldeota",
    numero: "120",
    cidade: "Fortaleza",
    complemento: "Apto. 302",
    observacao: "Prefere contato por WhatsApp.",
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    nome: "Carlos Eduardo Lima",
    telefone: "(85) 98822-3344",
    cpf: "987.654.321-00",
    rua: "Avenida Beira Mar",
    bairro: "Meireles",
    numero: "850",
    cidade: "Fortaleza",
    complemento: null,
    observacao: null,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    nome: "Mariana Alves",
    telefone: "(85) 97733-4455",
    cpf: null,
    rua: "Rua São José",
    bairro: "Centro",
    numero: "45",
    cidade: "Caucaia",
    complemento: "Casa B",
    observacao: "Cliente indicada por Carlos Eduardo.",
  },
];

const motos = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    clienteId: clientes[0].id,
    modelo: "Honda CG 160 Fan",
    placa: "SDA1A23",
    chassi: "9C2KC2200PR000001",
    cor: "Vermelha",
    ano: 2023,
    cilindrada: 160,
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    clienteId: clientes[1].id,
    modelo: "Yamaha Fazer FZ25",
    placa: "RIG2B34",
    chassi: "9C6RG5020N0000002",
    cor: "Azul",
    ano: 2022,
    cilindrada: 250,
  },
  {
    id: "20000000-0000-4000-8000-000000000003",
    clienteId: clientes[2].id,
    modelo: "Honda Biz 125",
    placa: "PMX3C45",
    chassi: "9C2JC4830RR000003",
    cor: "Branca",
    ano: 2024,
    cilindrada: 125,
  },
];

const pecas = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    nome: "Pastilha de freio dianteira",
    codigo: "PF-001",
    valorCusto: new Prisma.Decimal("45.00"),
    valorVenda: new Prisma.Decimal("70.00"),
    quantidadeEstoque: 18,
    estoqueMinimo: 5,
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    nome: "Óleo de motor 10W-40 1L",
    codigo: "OL-10W40",
    valorCusto: new Prisma.Decimal("25.50"),
    valorVenda: new Prisma.Decimal("38.90"),
    quantidadeEstoque: 32,
    estoqueMinimo: 10,
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    nome: "Filtro de óleo",
    codigo: "FO-002",
    valorCusto: new Prisma.Decimal("19.00"),
    valorVenda: new Prisma.Decimal("32.00"),
    quantidadeEstoque: 14,
    estoqueMinimo: 4,
  },
  {
    id: "30000000-0000-4000-8000-000000000004",
    nome: "Bateria 12V 6Ah",
    codigo: "BAT-12V6A",
    valorCusto: new Prisma.Decimal("175.00"),
    valorVenda: new Prisma.Decimal("249.90"),
    quantidadeEstoque: 6,
    estoqueMinimo: 2,
  },
];

const ordensServico = [
  {
    id: "40000000-0000-4000-8000-000000000001",
    motoId: motos[0].id,
    problema: "Ruído e baixa eficiência no freio dianteiro.",
    status: StatusOrdemServico.EM_ANDAMENTO,
    dataAbertura: new Date("2026-09-20T09:00:00-03:00"),
    observacao: "Cliente solicitou avaliação completa do sistema de freios.",
    dataFinalizacao: null,
  },
  {
    id: "40000000-0000-4000-8000-000000000002",
    motoId: motos[1].id,
    problema: "Revisão periódica e troca de óleo.",
    status: StatusOrdemServico.FINALIZADA,
    dataAbertura: new Date("2026-09-15T08:30:00-03:00"),
    observacao: "Revisão concluída sem problemas adicionais.",
    dataFinalizacao: new Date("2026-09-15T16:10:00-03:00"),
  },
  {
    id: "40000000-0000-4000-8000-000000000003",
    motoId: motos[2].id,
    problema: "Moto não liga e apresenta falha elétrica intermitente.",
    status: StatusOrdemServico.AGUARDANDO_PECA,
    dataAbertura: new Date("2026-09-22T10:15:00-03:00"),
    observacao: "Bateria condenada após teste de carga.",
    dataFinalizacao: null,
  },
];

const servicosOrdens = [
  {
    id: "50000000-0000-4000-8000-000000000001",
    ordemServicoId: ordensServico[0].id,
    servico: "Troca da pastilha de freio dianteira",
    valor: new Prisma.Decimal("120.00"),
    observacao: "Inclui limpeza e regulagem do conjunto.",
  },
  {
    id: "50000000-0000-4000-8000-000000000002",
    ordemServicoId: ordensServico[1].id,
    servico: "Revisão periódica",
    valor: new Prisma.Decimal("180.00"),
    observacao: "Verificação de freios, transmissão e sistema elétrico.",
  },
  {
    id: "50000000-0000-4000-8000-000000000003",
    ordemServicoId: ordensServico[1].id,
    servico: "Troca de óleo e filtro",
    valor: new Prisma.Decimal("60.00"),
    observacao: null,
  },
  {
    id: "50000000-0000-4000-8000-000000000004",
    ordemServicoId: ordensServico[2].id,
    servico: "Diagnóstico do sistema elétrico",
    valor: new Prisma.Decimal("80.00"),
    observacao: "Teste indicou necessidade de substituição da bateria.",
  },
];

const pecasOrdens = [
  {
    id: "60000000-0000-4000-8000-000000000001",
    ordemServicoId: ordensServico[0].id,
    pecaId: pecas[0].id,
    quantidade: 1,
    valorUnitario: new Prisma.Decimal("70.00"),
  },
  {
    id: "60000000-0000-4000-8000-000000000002",
    ordemServicoId: ordensServico[1].id,
    pecaId: pecas[1].id,
    quantidade: 2,
    valorUnitario: new Prisma.Decimal("38.90"),
  },
  {
    id: "60000000-0000-4000-8000-000000000003",
    ordemServicoId: ordensServico[1].id,
    pecaId: pecas[2].id,
    quantidade: 1,
    valorUnitario: new Prisma.Decimal("32.00"),
  },
  {
    id: "60000000-0000-4000-8000-000000000004",
    ordemServicoId: ordensServico[2].id,
    pecaId: pecas[3].id,
    quantidade: 1,
    valorUnitario: new Prisma.Decimal("249.90"),
  },
];

async function main() {
  for (const cliente of clientes) {
    await prisma.cliente.upsert({
      where: { id: cliente.id },
      update: cliente,
      create: cliente,
    });
  }

  for (const moto of motos) {
    await prisma.moto.upsert({
      where: { id: moto.id },
      update: moto,
      create: moto,
    });
  }

  for (const peca of pecas) {
    await prisma.peca.upsert({
      where: { id: peca.id },
      update: peca,
      create: peca,
    });
  }

  for (const ordemServico of ordensServico) {
    await prisma.ordemServico.upsert({
      where: { id: ordemServico.id },
      update: ordemServico,
      create: ordemServico,
    });
  }

  for (const servicoOrdem of servicosOrdens) {
    await prisma.servicoOrdem.upsert({
      where: { id: servicoOrdem.id },
      update: servicoOrdem,
      create: servicoOrdem,
    });
  }

  for (const pecaOrdem of pecasOrdens) {
    await prisma.pecaOrdem.upsert({
      where: { id: pecaOrdem.id },
      update: pecaOrdem,
      create: pecaOrdem,
    });
  }

  console.log("Seed concluído com sucesso.");
  console.log(
    `${clientes.length} clientes, ${motos.length} motos, ${pecas.length} peças, ` +
      `${ordensServico.length} ordens de serviço, ${servicosOrdens.length} serviços e ` +
      `${pecasOrdens.length} itens de peças inseridos.`,
  );
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
