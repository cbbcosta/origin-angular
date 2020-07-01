import { Component, HostListener } from '@angular/core';
import { months } from '../../helpers/month.array';
import {InputMaskService} from '../../services/input-mask.service';

@Component({
  selector: 'app-installments-form',
  templateUrl: './installments-form.component.html',
  styleUrls: ['./installments-form.component.scss']
})
export class InstallmentsFormComponent {
  totalOfMonths = 1;
  now = new Date();
  amountInputValid = true;
  totalAmount: string | number;
  month: string;
  monthIndex: number;
  year: number;
  goalFormDate: any;
  inputType = 'number';
  totalNumber: number;

  constructor(private maskInput: InputMaskService) {
    this.setStartDate();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): any {
    if (event.key === 'ArrowRight') {
      this.increaseMonth();
    } else if (event.key === 'ArrowLeft') {
      this.decreaseMonth();
    }
  }

  setStartDate(): void {
    if (this.monthIndex === months.length - 1) {
      this.monthIndex = 0;
      this.year = this.now.getFullYear() + 1;
    } else {
      this.monthIndex = this.now.getMonth() + 1;
      this.year = this.now.getFullYear();
    }

    this.month = months[this.monthIndex];
    this.setGoalFormDate();
  }

  setGoalFormDate(): void {
    this.goalFormDate = `${this.year}-${this.monthIndex + 1}-01`;
  }

  setTotalAmount(value): void {
    this.totalAmount = value;
  }

  monthlyDeposit(): string | number {
    console.log(this.totalNumber);
    const monthlyValue = this.totalNumber / this.totalOfMonths || 0;
    return monthlyValue.toFixed(2);
  }

  decreaseMonth(): void {
    const isCurrentYear = this.year === this.now.getFullYear();
    const isCurrentMonth = this.month === months[this.now.getMonth() + 1];

    if (isCurrentMonth && isCurrentYear) {
      return;
    }

    if (this.monthIndex === 0) {
      this.monthIndex = months.length - 1;
      this.year = this.year - 1;
    } else {
      this.monthIndex -= 1;
    }

    this.month = months[this.monthIndex];
    this.setGoalFormDate();
    this.totalOfMonths--;
  }

  increaseMonth(): void {
    if (this.monthIndex === months.length - 1) {
      this.monthIndex = 0;
      this.year = this.year + 1;
    } else {
      this.monthIndex += 1;
    }

    this.month = months[this.monthIndex];
    this.setGoalFormDate();
    this.totalOfMonths++;
  }

  maskInputValue(value): void {
    this.totalNumber = value;
    this.inputType = 'text';
    this.totalAmount = this.maskInput.maskCurrency(value);
  }

  storeNumber(value): void {
    this.totalAmount = value;
    this.inputType = 'number';
  }
}
