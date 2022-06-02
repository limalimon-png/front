import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverPerfilPageRoutingModule } from './popover-perfil-routing.module';

import { PopoverPerfilPage } from './popover-perfil.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ImagenPerfilPipe } from '../../pipes/imagen-perfil.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverPerfilPageRoutingModule,
    PipesModule,
    
  ],
  declarations: [PopoverPerfilPage]
})
export class PopoverPerfilPageModule {}
