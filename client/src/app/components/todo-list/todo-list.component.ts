import {
	ITask,
	ITaskResponse,
	ITaskResponse2,
	ITaskResponse3,
	Task,
} from 'src/app/models/task';
import { MasterService } from 'src/app/services/master.service';

import {
	Component,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  master = inject(MasterService)
  constructor() { }

  @Output() emitValues = new EventEmitter<any>();
  tasks: ITask[] = [];

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.master.getData().subscribe((res: ITaskResponse) => {
      this.tasks = res.data
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

  editTask(id: string) {
    const editMode = true
    this.master.getDatabyId(id).subscribe((res: ITaskResponse3) => {
      if (res.result) {
        const taskModel = res.data;
        const idOfTask = res.data._id
        this.emitValues.emit({editMode, taskModel, idOfTask})
        this.dateFormatterForDisplay(res.data.createdDate, 'create-date')
        this.dateFormatterForDisplay(res.data.dueDate, 'due-date')
      } else {
        alert('Failed to fetch task')
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
