import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Like } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  URL = environment.url;
  constructor(private http: HttpClient) { }


  like(idUsuario,idPost) {
    const parametros ={idUsuario,idPost}
    return new Promise(resolve => {

      this.http.post<Like>(`${this.URL}/likes/like`, parametros).subscribe(async res => {
        if (res['ok']) {
          resolve(true);
        } else (resolve(false))
      })
    })

  }
/*
  dislike() {
    return new Promise<Like>(resolve => {

      this.http.get<Like>(`${this.URL}/likes/getlikes/${idPost}`).subscribe(respuesta => {
        console.log(respuesta);

        resolve(respuesta);

      })


    })

  }
  */
  getLikes(idPost) {

    return new Promise<Like>(resolve => {

      this.http.get<Like>(`${this.URL}/likes/getlikes/${idPost}`).subscribe(respuesta => {
        console.log(respuesta);

        resolve(respuesta);

      })


    })
  }


}


