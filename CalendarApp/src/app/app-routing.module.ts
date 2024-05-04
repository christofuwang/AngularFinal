import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Body1Component } from './body1/body1.component';
import { Body2Component } from './body2/body2.component'
//import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: Body1Component
  },
  {
    path: 'allTasks',
    component: Body2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
