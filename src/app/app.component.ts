import { NONE_TYPE } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { Elo } from 'src/app/elo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/*
function expected(rating1: number, rating2: number): number {
  return 1 / (1 + 10 ** ((rating2 - rating1) / 400));
}

function new_rating(img1: ImageMeta, img2: ImageMeta, gameResult: number) {
  const rating1 = img1.rating;
  const rating2 = img2.rating;

  img1.rating = Math.round(rating1 + 32 * (gameResult - expected(rating1, rating2)));
  img2.rating = Math.round(rating2 + 32 * (1 - gameResult - expected(rating2, rating1)));
}

var imageArray: Array<ImageMeta> = [];
function initializeArray() {
  // clear array
  imageArray.splice(0);
}*/

export class AppComponent {
  title = 'elo';

  ngOnInit(): void {
    this.elo = new Elo("../assets/elo.json", "../assets/nose/");
    // wait for promise
    this.elo.ready.then(() => {
      this.task = this.elo.generateTask(5);
    }).then(() => {
      this.imageArray = this.task[0];
      this.inputArray = this.task[1];
      this.ready = true;
    })
  }

  // local UI state
  elo!: Elo;
  task: [Array<[number, number]>, Array<[string, string]>] = [[], []];
  imageArray: Array<[number, number]> = [];
  inputArray: Array<[string, string]> = [];
  ready = false;
  question = "Select the wider nose.";

  /*inputArray: Array<[string, string]> = [
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
  ];*/

  outputHandler(thing: Array<string>) {
    console.log('ALL TASKS DONE: ', thing);
  }

  test(): void {
    console.log(this.elo.generateTask(20));
  }
}
