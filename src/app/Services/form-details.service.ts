import { EventEmitter, Injectable, signal } from '@angular/core';
import { formObject } from '../Interfaces/allInterface.interface';

@Injectable({
  providedIn: 'root',
})
export class FormDetailsService {

  buttonText = new EventEmitter<string>();
  dataChanged = new EventEmitter<any>();


  constructor() {}
}
