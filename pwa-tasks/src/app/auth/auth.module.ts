import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule'}
];

@NgModule({
  declarations: [],
  imports: [AuthRoutingModule]
})
export class AuthModule { }
