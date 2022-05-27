import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenSanitazerPipe } from './imagen-sanitazer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ImagenPerfilPipe } from './imagen-perfil.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagenSanitazerPipe,
    ImagenPipe,
    ImagenPerfilPipe,
    

  ],
  imports: [
    CommonModule
  ],
  exports:[DomSanitizerPipe,ImagenSanitazerPipe,ImagenPipe,ImagenPerfilPipe]
})
export class PipesModule { }
