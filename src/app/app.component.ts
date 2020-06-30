import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CalculateService} from '../calculate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {

  constructor(private calculateService: CalculateService) {
  }

  ngOnInit(): void {
    console.log('oi');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentInit(): void {
  }
}
