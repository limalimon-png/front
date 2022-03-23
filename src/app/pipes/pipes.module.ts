import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenSanitazerPipe } from './imagen-sanitazer.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImagenSanitazerPipe,
    ImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[DomSanitizerPipe,ImagenSanitazerPipe,ImagenPipe]
})
export class PipesModule { }
