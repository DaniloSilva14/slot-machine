import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotMachineComponent } from './slot-machine/slot-machine.component';

const routes: Routes = [
  {
    path: '',
    component: SlotMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
