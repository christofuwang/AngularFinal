// body1.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-body1',
  templateUrl: './body1.component.html',
  styleUrls: ['./body1.component.css']
})
export class Body1Component {
  calendar = [
    [
      { date: 1, active: false }, { date: 2, active: false }, { date: 3, active: false },
      { date: 4, active: false }, { date: 5, active: false }, { date: 6, active: false },
      { date: 7, active: false }
    ],
    [
      { date: 8, active: false }, { date: 9, active: false }, { date: 10, active: false },
      { date: 11, active: false }, { date: 12, active: false }, { date: 13, active: false },
      { date: 14, active: false }
    ],
    [
      { date: 15, active: false }, { date: 16, active: false }, { date: 17, active: false },
      { date: 18, active: false }, { date: 19, active: false }, { date: 20, active: false },
      { date: 21, active: false }
    ],
    [
      { date: 22, active: false }, { date: 23, active: false },
      { date: 24, active: false }, { date: 25, active: false }, { date: 26, active: false },
      { date: 27, active: false }, { date: 28, active: false }
    ],
    // Add more weeks as needed
  ];

  toggleDay(day: any) {
    day.active = !day.active;
  }
}

