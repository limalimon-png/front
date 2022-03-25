import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PostPerfilComponent } from './post-perfil/post-perfil.component';
import { PostsPerfilComponent } from './posts-perfil/posts-perfil.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    PostPerfilComponent,
    PostsPerfilComponent

  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
    
  ],
  exports:[
    PostComponent,
    PostsComponent,
    PostPerfilComponent,
    PostsPerfilComponent
  ]
})
export class ComponentsModule { }
