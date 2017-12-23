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

  hasAttachStatus: SelectItem[];
  todos: Todo[];
  todo: Todo = new PrimeTodo();
  newTodo: boolean;
  selectedTodo: Todo;
  displayDialog: boolean;
  postTodoRequest: Todo[];
  selectedStatus: any;
  temp: Todo;



  constructor(private dataService: DataService) {


  }


  ngOnInit() {
    console.log('In ngOnit method');
    this.dataService.getUserTodo()
      .subscribe((todoList: any[]) => {
        console.log(todoList);
        this.todos = todoList;
      },
      error => {
        console.log(error);
      }
      );
    // this.hasAttachStatus = [];

    this.postTodoRequest = [];
    this.displayDialog = true;
    this.displayDialog = false;



    // this.hasAttachStatus.push({ label: 'Select status', value: null });
    // this.hasAttachStatus.push({ label: 'true', value: 'true' });
    // this.hasAttachStatus.push({ label: 'false', value: 'false' });
    console.log(this.hasAttachStatus);
  }


  saveAddedTodo(form) {
    console.log('In save todo');
    console.log(form);
    // console.log(this.temp);
  }

  Add() {
    console.log('In Add method');
    this.displayDialog = true;
    this.hasAttachStatus = [
      { label: 'true', value: 'true' },
      { label: 'false', value: 'false' }
    ];

    this.selectedStatus = this.hasAttachStatus[0];
  }

  save() {
    this.postTodoRequest.forEach(x => {
      // post call omade on save
      this.dataService.updateTodo(x)
        .subscribe((status: any) => {
          console.log(status);
          // this.todos = todoList;
        },
        error => {
          console.log(error);
        }
        );

    });
  }

  onEditComplete(event: any) {
    console.log(event);
  }

  onRowClick(event: any, col: any, rowData: Todo) {
    // Boolean flag = false;

    let flag: boolean;
    flag = false;
    // check if this todo is alredy in postTodoRequest List
    // if it there then update that todo value and if not then addd this todo
    // console.log(col);
    // console.log(rowData);
    // console.log(event);

    for (let i = 0; i < this.postTodoRequest.length; i++) {
      if (this.postTodoRequest[i]._id === rowData._id) {
        this.postTodoRequest[i] = rowData;
        flag = true;
        break;
      }
    }

    // if (this.postTodoRequest.indexOf(rowData._id) === -1 ) {
    //   this.postTodoRequest.push(rowData);
    // }
    // else {
    //   this.postTodoRequest[this.postTodoRequest.indexOf(rowData._id] = rowData;
    //   }


    if (flag === false) {
      this.postTodoRequest.push(rowData);
    }
    console.log(this.postTodoRequest);

  }

  cloneTodo(c: Todo): Todo {
    const todo = new PrimeTodo();
    for (const field of Object.keys(c)) {
      todo[field] = c[field];
    }
    return todo;
  }

  // cloneCar(c: Todo): Todo {
  //   const todo = new PrimeTodo();
  //   for (const prop in c) {
  //     todo[prop] = c[prop];
  //   }
  //   return todo;
  // }

  // selectCar(car: Car) {
  //   this.selectedCar = car;
  //   this.displayDialog = true;
  // }

  // onDialogHide() {
  //   this.selectedCar = null;
  // }
}


class PrimeTodo implements Todo {

  constructor(public _id?, public userId?, public todo?, public hasAttachment?, public isDone?) { }
}
