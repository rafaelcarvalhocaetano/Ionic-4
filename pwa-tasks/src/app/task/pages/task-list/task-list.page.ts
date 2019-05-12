import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.tasks$ = this.taskService.getAll();
  }

}
