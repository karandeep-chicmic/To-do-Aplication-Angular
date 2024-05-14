import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from '../../Services/api-calls.service';
import { FormDetailsService } from '../../Services/form-details.service';
import { formObject } from '../../Interfaces/allInterface.interface';

@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, CommonModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css',
})
export class TodoDetailsComponent implements OnInit {
  // all the injected services 
  constructor(
    private apiCalls: ApiCallsService,
    private formDetails: FormDetailsService
  ) {}

// Variables
  data = this.apiCalls.data; 
  tblData: any;
  showToggle: boolean = false;

  //  lifecycle hooks
  ngOnInit(): void {
    this.apiCalls.getData();
    this.apiCalls.data.subscribe((data) => {
      this.tblData = data?.data;
    });
  }

  // all methods of class
  editTask(task: any) { //To edit the task
    const obj: formObject = {
      _id: task._id,
      title: task.title,
      description: task.description,
    };

    this.formDetails.buttonText.emit("Update User")
    this.formDetails.dataChanged.emit(obj);

  }

  // To delete a task on basis of given id
  deleteTask(taskId: string) {
    this.apiCalls.deleteData(taskId).subscribe((data) => {
      console.log(data);
      this.apiCalls.getData();
    });

    this.apiCalls.data.subscribe((data) => {
      this.tblData = data.data;
    });

  }

  // On changing of toggle
  toggleChanged(id: any, task: any) {
    this.apiCalls
      .changeActiveStatus(id, task)
      .subscribe((data) => console.log(data));
  }

  
}
