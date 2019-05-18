import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private navCtrl: NavController,
    private overlayService: OverlayService
  ) { }

  async ngOnInit(): Promise<void> {
    const loader = await this.overlayService.loading();
    this.tasks$ = this.taskService.getAll();
    this.tasks$.pipe(take(1)).subscribe(x => loader.dismiss());
  }

  onUpdate(event: Task): void {
    // this.navCtrl.navigateForward(`/task/edit/${event.id}`);
    this.navCtrl.navigateForward(['task', 'edit', event.id]);
  }

  async onDelete(event: Task): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete the task ${event.title} ?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.taskService.delete(event);
            await this.overlayService.toast({ message: ` Task ${event.title} deletada `});
          }
        },
        'No'
      ]
    });
  }

  async onDone(event: Task) {
    const taskToUpdate = { ...event, doe: !event.done };
    await this.taskService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task ${event.title} ${taskToUpdate.done ? 'Completed' : 'Updated'} !`
    })
  }

}
