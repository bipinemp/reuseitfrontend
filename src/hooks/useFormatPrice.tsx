function useFormatPrice(price: number) {
  const formattedPrice = Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price / 100);
  return { formattedPrice };
}

export default useFormatPrice;
