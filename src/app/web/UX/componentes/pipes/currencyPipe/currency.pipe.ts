import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: string): string {
    const parsedValue = parseFloat(value);
    
    if (isNaN(parsedValue)) {
      return value; // Devuelve el valor original si no se puede analizar como número
    }

    const formattedValue = parsedValue.toFixed(2);
    const result = `$${formattedValue}`;
    return result;
  }

}
