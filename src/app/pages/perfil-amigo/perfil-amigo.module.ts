import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAmigoPageRoutingModule } from './perfil-amigo-routing.module';

import { PerfilAmigoPage } from './perfil-amigo.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAmigoPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [PerfilAmigoPage]
})
export class PerfilAmigoPageModule {}
