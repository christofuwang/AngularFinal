// body2.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-body2',
  templateUrl: './body2.component.html',
  styleUrls: ['./body2.component.css']
})
export class Body2Component {
  selectedDay: string = '';

  toggleDay(day: string) {
    this.selectedDay = day;
  }
}

