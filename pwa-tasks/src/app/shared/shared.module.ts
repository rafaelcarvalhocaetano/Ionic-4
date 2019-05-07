import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  exports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class SharedModule {}
