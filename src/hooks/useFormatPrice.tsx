function useFormatPrice(price: number) {
  const formattedPrice = Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(price);
  return { formattedPrice };
}

export default useFormatPrice;
