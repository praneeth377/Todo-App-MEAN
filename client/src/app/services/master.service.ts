import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITaskResponse, ITaskResponse2, ITaskResponse3 } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {}

  getData(): Observable<ITaskResponse> {
    return this.http.get<ITaskResponse>('http://localhost:3000/allTasks');
  }

  getDatabyId(id: string): Observable<ITaskResponse3> {
    return this.http.get<ITaskResponse3>('http://localhost:3000/taskById/' + id);
  }

  postData(task: any): Observable<ITaskResponse> {
    return this.http.post<ITaskResponse>('http://localhost:3000/addTask', task);
  }

  updateData(id: string, task: any): Observable<ITaskResponse2> {
    return this.http.put<ITaskResponse2>('http://localhost:3000/updateTask/' + id, task);
  }

  deleteData(id: string): Observable<ITaskResponse2> {
    return this.http.delete<ITaskResponse2>('http://localhost:3000/deleteTask/' + id);
  }
}
