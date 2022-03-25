import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverPerfilPage } from './popover-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverPerfilPageRoutingModule {}
