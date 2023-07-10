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

  /**
   * @Metodo quita los simbolos y parse a un numero
   */
export const quitarMoneda = (datos: any) => {
    return datos.map((producto: any) => {
      if (
        typeof producto.precioVenta == 'string' &&
        typeof producto.precioCompra == 'string'
      ) {
        producto.precioCompra = producto.precioCompra
          .replace('$', '')
          .replace(',', '');
        producto.precioVenta = producto.precioVenta
          .replace('$', '')
          .replace(',', '');
      }

      return producto;
    });
  }
