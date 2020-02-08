import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  taskForm: FormGroup;
  public pageTitle = '...';
  public taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overLayService: OverlayService
  ) { }

  ngOnInit() {
    this.createForm();
    this.init();
  }

  public init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Edit Task';
    this.taskService.get(taskId).pipe(take(1)).subscribe((x) => {
      this.taskForm.get('title').setValue(x.title);
      this.taskForm.get('done').setValue(x.done);
    });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmited(): Promise<void> {
    const loader = await this.overLayService.loading({
      message: 'Saving ....'
    });
    try {
      !this.taskId
      ? await this.taskService.create(this.taskForm.value)
      : await this.taskService.update({
        id: this.taskId,
        ...this.taskForm.value
      });
      this.navCtrl.navigateBack('/task');
      this.taskForm.reset();
    } catch (error) {
      await this.overLayService.toast({message: error.message});
    } finally {
      loader.dismiss();
    }
  }

}
