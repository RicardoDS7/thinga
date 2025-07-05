  // lib/formatCurrency.ts
export function formatCurrency(value: number | string) {
  const num = typeof value === "string" ? parseFloat(value.replace(/[^\d]/g, '')) : value;
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(num);
}