import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputMaskService {

  constructor() { }

  public maskCurrency(currentNumber): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(currentNumber).slice(1);
  }
}
