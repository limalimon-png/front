import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { GuardadosService } from '../../services/guardados.service';

import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MovilStorageService } from '../../services/movil-storage.service';
import { LikesService } from '../../services/likes.service';
import { Usuario } from '../../interfaces/interfaces';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  iconoGuardado='bookmark-outline';
  likes;
  iconoLike='';
  usuario:Usuario
  @Input() post:Post={};
  img='/assets/perro-1.jpg';
  img2='/assets/perro-2.jpg';
  img3='/assets/perro-3.jpg';
  constructor(private datalocal:GuardadosService,private ruta:Router,private us:UsuarioService,private movilStorage:MovilStorageService,private likeService:LikesService) { }

  ionViewWillEnter() {
    const post=this.movilStorage.postLiked(this.post);
  }
  ngOnInit() {
    this.usuario= this.us.getUsuario();
    const post=this.movilStorage.postLiked(this.post);
    this.likeService.getLikes(this.post._id).then(respuesta=>{
      this.likes=respuesta.numeroLikes;
      
    })

     
    if(post){
      this.iconoLike ='heart'
      
    }else{
      this.iconoLike ='heart-outline';
      

    }
   this.datalocal.existePelicula(this.post._id).then(dato=>{
     if(dato)this.post.guardado=true;
   });
  }
  guardar(){
    console.log("guardar");
    
    const existe=this.datalocal.set(this.post);
     
    if(existe){
      this.iconoGuardado ='bookmark'
      this.post.guardado=true;
    }else{
      this.iconoGuardado ='bookmark-outline';
      this.post.guardado=false;   
      
    }
     // // this.pagFavoritos=new Tab3Page(this.datalocal);
    // // this.pagFavoritos.probar();
    
  }

  route(){
    this.us.setUserAmigo(this.post.usuario);
    this.ruta.navigate(['/perfil-amigo']);
  }

  like(){
    const post=this.movilStorage.postLiked(this.post);
     
    if(post){
      this.movilStorage.saveRemoveLikePost(this.post)
      this.iconoLike ='heart-outline';
      this.likeService.dislike(this.usuario._id,this.post._id) 
      
    }else{
      this.movilStorage.saveRemoveLikePost(this.post)
      this.iconoLike ='heart'
      this.likeService.like(this.usuario._id,this.post._id) 
      

    }
    this.likeService.getLikes(this.post._id).then(respuesta=>{
      this.likes=respuesta.numeroLikes;
      console.log(respuesta.usuarios);
      console.log('usuario le dio like');
     
      
      
      
    })
  }

}
