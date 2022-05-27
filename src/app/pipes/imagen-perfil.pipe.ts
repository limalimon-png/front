import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Pipe({
  name: 'imagenPerfil'
})
export class ImagenPerfilPipe implements PipeTransform {

  url=environment.url
  transform(img: string, userId: string): string {
    return `${this.url}/user/imagen/${userId}/${img}`;
  }

}
