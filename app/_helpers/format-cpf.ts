export const formatCpf = (cpf?: string | null) => {
  if (!cpf) return "Não informado";

  const digits = cpf.replace(/\D/g, "");

  if (digits.length !== 11) return cpf;

  return digits.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4",
  );
};