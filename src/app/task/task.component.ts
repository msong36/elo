import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // I/O
  @Input() inputArray: Array<[string, string]> = [];
  img1: string = "";
  img2: string = "";

  constructor() { }

  ngOnInit(): void {
    this.img1 = this.inputArray[this.currentTask][0];
    this.img2 = this.inputArray[this.currentTask][1];
  }

  // local UI state
  currentTask = 0;

  // functions
  help() {
    console.log("TODO: help modal");
  }

  next() {
    // check if a radio button is checked
    var radioCheck = document.querySelector('input[name="avatars"]:checked');
    if (!radioCheck) {
      console.log("Nothing checked");
      return;
    }

    // get selected value
    let selectedValue = (radioCheck as HTMLInputElement).value;
    console.log(selectedValue + ' selected');

    // uncheck radio for next
    var elements = document.getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type == 'radio') {
        elements[i].checked = false;
      }
    }

    // modulus only for testing purposes
    // need to add functionality for when all tasks are completed
    this.currentTask = (this.currentTask + 1) % this.inputArray.length;

    // set new img url links
    this.img1 = this.inputArray[this.currentTask][0];
    this.img2 = this.inputArray[this.currentTask][1];
  }

}
