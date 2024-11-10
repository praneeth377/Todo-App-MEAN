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
export class AppComponent implements OnInit {
  // constructor(private master: MasterService) {}
  master = inject(MasterService)

  taskModel: Task = new Task()
  tasks: ITask[] = []
  editMode: boolean = false
  availableTags: string[] = ['Hobby', 'Holiday', 'Financial', 'Fun', 'Emergency', 'Health', 'Work', 'Education', 'Social', 'Travel']

  ngOnInit(): void {
      this.getTasks()
  }

  getTasks() {
    this.master.getData().subscribe((res: ITaskResponse) => {
      this.tasks = res.data
    })
  }

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

  dateFormatterForDisplay(date: Date, id: string) {
    setTimeout(() => {
      const dat = new Date(date);
      const day = ('0' + dat.getDate()).slice(-2);
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const today = dat.getFullYear() + '-' + (month) + '-' + (day);
      (<HTMLInputElement>document.getElementById(id)).value = today;
    }, 1000)
  }

  idOfTask: string = ''
  editTask(id: string) {
    this.editMode = true
    this.master.getDatabyId(id).subscribe((res: ITaskResponse3) => {
      if (res.result) {
        this.taskModel = res.data;
        this.idOfTask = res.data._id
        this.dateFormatterForDisplay(res.data.createdDate, 'create-date')
        this.dateFormatterForDisplay(res.data.dueDate, 'due-date')
      } else {
        alert('Failed to fetch task')
      }
    })
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

  deleteTask(id: string) {
    this.master.deleteData(id).subscribe((res: ITaskResponse2) => {
      if (res.result) {
        alert(res.message)
        window.location.reload()
      } else {
        alert('Failed to delete task')
      }
    })
  }
}
