import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Like } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  URL = environment.url;
  constructor(private http: HttpClient,private storage: Storage) { }


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

  dislike(idUsuario,idPost) {
    const parametros ={idUsuario,idPost}
    return new Promise(resolve => {

      this.http.post<Like>(`${this.URL}/likes/unlike`,parametros).subscribe(respuesta => {
        if (respuesta['ok']) {
          resolve(true);
        } else (resolve(false))

      })


    })

  }
  
  getLikes(idPost) {

    return new Promise<Like>(resolve => {

      this.http.get<Like>(`${this.URL}/likes/getlikes/${idPost}`).subscribe(respuesta => {
        //console.log(respuesta);
        respuesta.numeroLikes= respuesta.usuarios.length

        resolve(respuesta);

      })


    })
  }

  getPostLike(idUser) {

    return new Promise<any>(resolve => {

      this.http.get<any>(`${this.URL}/likes/getpostlike/${idUser}`).subscribe(respuesta => {
       // console.log(respuesta);

        resolve(respuesta);

      })


    })
  }


  //'/getpostlike/:userid'

}


