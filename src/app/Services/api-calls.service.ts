import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { formObject } from '../Interfaces/allInterface.interface';
import { FormGroup } from '@angular/forms';
import { apis } from '../api-urls/apiUrls';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}

  private dataSubject = new BehaviorSubject<any>(null);

  data: Observable<any> = this.dataSubject.asObservable();
  tblData: any;

  getData() {
    return this.http.get<any>(apis.BASEURL).subscribe((data) => {
      this.dataSubject.next(data);
    });
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete<any>(apis.BASEURL + id);
  }

  changeActiveStatus(id: any, task: any): Observable<any> {
    return this.http.patch(apis.BASEURL + apis.TOGGLEPATCH + id, task);
  }

  saveToDb(data: formObject): Observable<any> {
    return this.http.post<any>(apis.BASEURL, data);
  }

  updateForm(form: formObject, id: any): Observable<any> {
    return this.http.patch<any>(apis.BASEURL + id, form);
  }
}
