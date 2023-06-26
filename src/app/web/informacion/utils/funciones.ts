export const formateoMoneda = (numero: number) => {
  let isNegative = false;
  let formattedNumber;

  if (numero < 0) {
    isNegative = true;
    numero = Math.abs(numero);
  }

  const parts = numero.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  formattedNumber = '$' + formattedNumber + decimalPart;

  if (isNegative) {
    formattedNumber = '-' + formattedNumber;
  }

  return formattedNumber;
};
