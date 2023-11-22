function useFormatPrice(price: number) {
  const formattedPrice = Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(price);
  return { formattedPrice };
}

export default useFormatPrice;
