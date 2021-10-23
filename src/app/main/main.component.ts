import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  newTask: string;
  tasksDone: Array<string> = [];
  tasksList: Array<string> = [];
  tasksRandom: Array<string> = ['Posprzątać mieszkanie', "Wynieść śmieci"];
  number: number;
  isClicked: boolean = false;

  add() {
    this.tasksList.push(this.newTask);
    this.newTask = '';

    // Trzeba nową funkcję


  }

  remove(task: string) {
    this.tasksList = this.tasksList.filter(e => e !== task);
  }

  done(task: string) {
    this.tasksDone.push(task);
    this.remove(task);
  }

  randomNumber() {
    this.number = Math.random()*2;
    console.log(this.number)
  }


  constructor() { }

  ngOnInit(): void {

  }



}




