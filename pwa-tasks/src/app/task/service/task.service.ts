import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/class/Firestore';
import { Task } from '../models/task.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Firestore<Task>{

  constructor(
    private authService: AuthService,
    db: AngularFirestore) {
    super(db);
    this.init();
  }


  private init(): void {
    this.authService.authState$.subscribe(x => {
      if (x) {
        this.setCollection(`/users/${x.uid}/tasks`);
        return;
      }
      this.setCollection(null);
    });
  }
}
