import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import {
	ITask,
	ITaskResponse,
	ITaskResponse2,
	ITaskResponse3,
	Task,
} from './models/task';
import { MasterService } from './services/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // constructor(private master: MasterService) {}
  master = inject(MasterService)

  taskModel: Task = new Task()
  tasks: ITask[] = []
  editMode: boolean = false
  availableTags: string[] = ['Hobby', 'Holiday', 'Financial', 'Fun', 'Emergency', 'Health', 'Work', 'Education', 'Social', 'Travel']

  toggleTag(tag: string) {
    const idx = this.taskModel.tags.indexOf(tag)
    if (idx > -1) {
      this.taskModel.tags.splice(idx, 1)
    } else {
      this.taskModel.tags.push(tag)
    }
  }

  addTask() {
    this.master.postData(this.taskModel).subscribe((res: ITaskResponse) => {
      if (res.result) {
        alert('Task added successfully')
        window.location.reload()
      } else {
        alert('Failed to add task')
      }
    })
  }

  idOfTask: string = ''
  receiveValues(data: {editMode: boolean, taskModel: Task, idOfTask: string}) {
    this.editMode = data.editMode
    this.taskModel = data.taskModel
    this.idOfTask = data.idOfTask
  }

  saveTask() {
    this.master.updateData(this.idOfTask, this.taskModel).subscribe((res: ITaskResponse2) => {
      if (res.result) {
        alert('Task updated successfully')
        window.location.reload()
      } else {
        alert('Failed to update task')
      }
    })
  }
}
