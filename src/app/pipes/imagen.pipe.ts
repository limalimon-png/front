import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
url=environment.url
  transform(img: string, userId: string): string {
    return `${this.url}/posts/imagen/${userId}/${img}`;
  }

}
