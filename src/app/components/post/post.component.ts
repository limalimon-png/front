import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { GuardadosService } from '../../services/guardados.service';

import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { MovilStorageService } from '../../services/movil-storage.service';
import { LikesService } from '../../services/likes.service';
import { Usuario } from '../../interfaces/interfaces';

declare var window:any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  iconoGuardado='bookmark-outline';
  likes;
  iconoLike='';
  post2:boolean
  usuario:Usuario
  @Input() post:Post={};
  
  constructor(private datalocal:GuardadosService,private ruta:Router,private us:UsuarioService,private movilStorage:MovilStorageService,private likeService:LikesService) { }

  ionViewWillEnter() {
  this.post2=this.movilStorage.postLiked(this.post);

  console.log('entra aqui');
  
  
  }
  async ngOnInit() {
    // const img = window.Ionic.WebView.convertFileSrc( this.post.img);
    // this.post.img=img;
    this.usuario= this.us.getUsuario();
    this.usuario.imagen=await this.us.getFotoPerfil(this.usuario._id);
    console.log('imagen: ',this.post.usuario.imagen);
    this.post.usuario.imagen=await this.us.getFotoPerfil(this.post.usuario._id);
    
   this.post2 =this.movilStorage.postLiked(this.post);
   //console.log('post likeado',this.post2);
    this.likeService.getLikes(this.post._id).then(respuesta=>{
      this.likes=respuesta.numeroLikes;
      
    })

     
    if(this.post2){
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

  async like(){
    this.post2=this.movilStorage.postLiked(this.post);
     
    if(this.post2){
      this.movilStorage.saveRemoveLikePost(this.post)
      this.iconoLike ='heart-outline';
       await this.likeService.dislike(this.usuario._id,this.post._id) 
      
    }else{
      this.movilStorage.saveRemoveLikePost(this.post)
      this.iconoLike ='heart'
      await this.likeService.like(this.usuario._id,this.post._id) 
      

    }
    this.likeService.getLikes(this.post._id).then(respuesta=>{
      this.likes=respuesta.numeroLikes;
      console.log(respuesta.usuarios);
      console.log('usuario le dio like');
     
      
      
      
    })
  }

  pageLikes(){
    
    this.ruta.navigate(['/modal-likes/'+this.post._id]);
  }

}
