export const formateoMoneda = (numeroInt: number) => {
  const numero = numeroInt.toFixed(2);
  let formattedNumber;

  const parts = numero.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  formattedNumber = '$' + formattedNumber + decimalPart;

  return formattedNumber;
};
