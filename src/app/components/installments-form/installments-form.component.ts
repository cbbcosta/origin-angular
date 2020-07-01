import {Component, HostListener} from '@angular/core';
import {months} from '../../month.array';

@Component({
  selector: 'app-installments-form',
  templateUrl: './installments-form.component.html',
  styleUrls: ['./installments-form.component.scss']
})
export class InstallmentsFormComponent {
  totalOfMonths = 1;
  now = new Date();
  amountInputValid = true;
  totalAmount = 0;
  month: string;
  monthIndex: number;
  year: number;
  goalFormDate: any;

  constructor() {
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
    this.monthIndex = this.now.getMonth() + 1;
    this.month = months[this.monthIndex];
    this.year = this.now.getFullYear();
    this.setGoalFormDate();
  }

  setGoalFormDate(): void {
    this.goalFormDate = `${this.year}-0${this.monthIndex + 1}-01`;
  }

  setTotalAmount(value): void {
    this.totalAmount = value;
  }

  monthlyDeposit(): string | number {
    const monthlyValue = this.totalAmount / this.totalOfMonths || 0;
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
    this.calculateTotalMonths();
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
    this.calculateTotalMonths();
  }

  calculateTotalMonths(): void {
    const monthIndex = months.indexOf(this.month) + 1;
    const monthsInYears = (this.year - this.now.getFullYear()) * 12;
    if (monthsInYears === 0) {
      this.totalOfMonths = monthIndex - this.now.getMonth();
    } else {
      this.totalOfMonths =  monthsInYears - this.now.getMonth() + monthIndex;
    }
  }
}
