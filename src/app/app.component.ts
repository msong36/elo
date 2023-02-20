import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elo';

  inputArray: Array<[string, string]> = [
    ['../../assets/nose/nose_1435.png', '../../assets/nose/nose_1436.png'],
    ['../../assets/nose/nose_1509.png', '../../assets/nose/nose_1510.png']
  ];
}
