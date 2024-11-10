export interface ITask {
  _id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
  isCompleted: boolean;
  tags: string[];
  completedOn: Date;
}

export class Task {
  _id?: string;
  name: string;
  description: string;
  dueDate: Date;
  createdDate: Date;
  isCompleted: boolean;
  tags: string[];
  completedOn: Date;

  constructor() {
    this.name = '';
    this.description = '';
    this.dueDate = new Date();
    this.createdDate = new Date();
    this.isCompleted = false;
    this.tags = [];
    this.completedOn = new Date();
  }
}

export interface ITaskResponse {
  result: boolean;
  data: ITask[];
}

export interface ITaskResponse2 {
  result: boolean;
  message: string;
}

export interface ITaskResponse3 {
  result: boolean;
  data: ITask;
}
