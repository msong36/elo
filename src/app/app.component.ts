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
    ['../../assets/nose/nose_1486.png', '../../assets/nose/nose_1487.png'],
    ['../../assets/nose/nose_1439.png', '../../assets/nose/nose_1440.png'],
    ['../../assets/nose/nose_1441.png', '../../assets/nose/nose_1447.png'],
    ['../../assets/nose/nose_1523.png', '../../assets/nose/nose_1524.png'],
    ['../../assets/nose/nose_2745.png', '../../assets/nose/nose_2663.png'],
    ['../../assets/nose/nose_1447.png', '../../assets/nose/nose_1448.png'],
    ['../../assets/nose/nose_1449.png', '../../assets/nose/nose_1450.png'],
    ['../../assets/nose/nose_1451.png', '../../assets/nose/nose_1452.png'],
    ['../../assets/nose/nose_1509.png', '../../assets/nose/nose_1510.png']
  ];
  question = "Select the wider nose.";

  outputHandler(thing: Array<string>) {
    console.log('ALL TASKS DONE: ', thing);
  }
}
