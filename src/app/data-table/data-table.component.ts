import { Todo } from './todo';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  hasAttachStatus: SelectItem[];    // holds possible status
  todos: Todo[];            // holds todo list for user 

  displayDialog: boolean;
  postTodoRequest: Todo[];
  selectedStatus: any;
  addedTodo: Todo = new PrimeTodo();

  constructor(private dataService: DataService) {
  }


  ngOnInit() {

    this.dataService.getUserTodo()
      .subscribe((todoList: any[]) => {
        // console.log(todoList);
        this.todos = todoList;
      },
      error => {
        console.log(error);
      }
      );


    this.hasAttachStatus = [];
    this.postTodoRequest = [];

    this.hasAttachStatus.push({ label: 'Select status', value: null });
    this.hasAttachStatus.push({ label: 'true', value: 'true' });
    this.hasAttachStatus.push({ label: 'false', value: 'false' });
    // console.log(this.hasAttachStatus);
    this.displayDialog = true;  // debug 
  }


  saveAddedTodo(form) {
    console.log(form);
    this.addedTodo._id = '5a31132d446641324c191234';
    this.addedTodo.isDone = false;
    this.dataService.insertTodo(this.addedTodo)
      .subscribe((status: any) => {
        console.log(status);
      },
      error => {
        console.log(error);
      }
      );
  }

  Add() {

    this.displayDialog = true;
  }

  save() {
    this.postTodoRequest.forEach(x => {
      // post call omade on save
      this.dataService.updateTodo(x)
        .subscribe((status: any) => {
          console.log(status);
        },
        error => {
          console.log(error);
        }
        );

    });
    this.postTodoRequest = [];

  }



  onRowClick(event: any, col: any, rowData: Todo) {

    let flag: boolean;
    flag = false;
    // checking if todo is already edited if it is then adding changes there 
    for (let i = 0; i < this.postTodoRequest.length; i++) {
      if (this.postTodoRequest[i]._id === rowData._id) {
        this.postTodoRequest[i] = rowData;
        flag = true;
        break;
      }
    }

    if (flag === false) {
      this.postTodoRequest.push(rowData);
    }
  }
}

class PrimeTodo implements Todo {
  constructor(public _id?, public userId?, public todo?, public hasAttachment?, public isDone?) { }
}


