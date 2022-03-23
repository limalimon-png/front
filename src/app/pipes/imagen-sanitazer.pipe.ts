import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imagenSanitazer'
})
export class ImagenSanitazerPipe implements PipeTransform {
  constructor(private dom:DomSanitizer){}

  transform(img:  any): any {
    return this.dom.bypassSecurityTrustUrl(img);
  }

}
