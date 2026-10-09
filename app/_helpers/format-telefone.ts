export const formatTelefone = (telefone: string) => {
  const digits = telefone.replace(/\D/g, "");

  if (digits.length !== 11) return telefone;

  return digits.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3",
  );
};