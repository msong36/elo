import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // I/O
  @Input() inputArray: Array<[string, string]> = [];
  @Input() question: string = "Error: Question not loaded";
  @Output() outputArray = new EventEmitter<Array<string>>();
  img1: string = "";
  img2: string = "";

  constructor() { }

  ngOnInit(): void {
    this.img1 = this.inputArray[this.currentTask][0];
    this.img2 = this.inputArray[this.currentTask][1];
  }

  // local UI state
  currentTask = 0;
  gameResults = new Array;
  tasksFinished = false;

  // functions
  help() {
    console.log("TODO: help modal");
  }

  next() {
    // check if a radio button is checked
    var radioCheck = document.querySelector('input[name="avatars"]:checked');
    if (!radioCheck) {
      return;
    }

    // get selected value and load into output
    let selectedValue = (radioCheck as HTMLInputElement).value;
    this.gameResults.push(selectedValue);
    console.log(selectedValue + ' selected');

    // uncheck radio for next
    var elements = document.getElementsByTagName('input');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].type == 'radio') {
        elements[i].checked = false;
      }
    }

    // move onto next task
    this.currentTask += 1;

    if (this.currentTask < this.inputArray.length) {
      this.img1 = this.inputArray[this.currentTask][0];
      this.img2 = this.inputArray[this.currentTask][1];
      return;
    }

    // all tasks are completed
    this.outputArray.emit(this.gameResults);
    this.tasksFinished = true;
  }

}
