import { Component, OnInit } from '@angular/core';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormDetailsService } from '../../Services/form-details.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { formObject } from '../../Interfaces/allInterface.interface';
import { CommonModule } from '@angular/common';
import { ApiCallsService } from '../../Services/api-calls.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SweetAlertService } from '../../Services/sweet-alert.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [TodoDetailsComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent implements OnInit {
  //  All the injected Services
  constructor(
    private formBuilder: FormBuilder,
    private formDetailsService: FormDetailsService,
    private apiCalls: ApiCallsService,
    private sweetAlertService: SweetAlertService
  ) {}

  buttonText: string = 'Add User'; //Button text default
  receivedData: any; // the received data of form on update click

  // form group for form
  form: FormGroup = this.formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Lifecycle hooks
  ngOnInit(): void {
    this.formDetailsService.dataChanged.subscribe((data: any) => {
      this.receivedData = data;
      if (this.receivedData?._id) {
        this.form.controls['title'].setValue(this.receivedData?.title);
        this.form.controls['description'].setValue(
          this.receivedData?.description
        );
        this.form.controls['id'].setValue(this.receivedData?._id);
      }
    });
    this.formDetailsService.buttonText.subscribe((data) => {
      this.buttonText = data;
    });
  }

  // All methods of class
  onSubmit() {
    // Check if form valid or not
    if (this.form.invalid) {
      this.sweetAlertService.errorToaster();
      return;
    }

    // Check if form is update or add
    if (this.form.controls['id'].value != '') {
      //if id then update
      const formObj: formObject = {
        title: this.form.value.title,
        description: this.form.value.description,
      };

      // put api for updating data
      this.apiCalls
        .updateForm(formObj, this.form.controls['id'].value)
        .subscribe((data) => {
          console.log(data);
          this.apiCalls.getData();
        });

      // to reset the values of form
      this.form.reset();
      this.form.controls['id'].setValue('');
    } else {
      //  created an object to post in db
      const formObj: formObject = {
        title: this.form.value.title,
        description: this.form.value.description,
      };

      //  http req for saving to db
      this.apiCalls.saveToDb(formObj).subscribe({
        next: (data) => {
          this.sweetAlertService.successMsg();
          this.apiCalls.getData();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('saved to Db');
        },
      });

      this.form.reset();
    }
  }
}
