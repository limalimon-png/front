import { Like, UserLiked } from './../../interfaces/interfaces';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { LikesService } from './../../services/likes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-likes',
  templateUrl: './modal-likes.page.html',
  styleUrls: ['./modal-likes.page.scss'],
})
export class ModalLikesPage implements OnInit {
idpost;
like:Like;
numLikes:number;
persona:UserLiked[]=[]
  constructor(private likeService:LikesService , private userService:UsuarioService,private router:Router) {}

  async ngOnInit() {
    //http://localhost:8100/modal-likes/627f74eb0b8a7a4ca7b833de
   this.idpost= this.router.url.split('/')[2];
    
    
    this.like= await this.likeService.getLikes(this.idpost);
    this.numLikes=this.like.numeroLikes;
    console.log('num likes',this.like.numeroLikes);
    console.log('idusuario',this.like.usuarios);
    

    
    this.like.usuarios.forEach(async ele=>{
      console.log('for',ele);
      
     this.persona.push( await this.userService.getUsuariosLiked(ele));
    })
  }


  route(id){
    
    this.userService.getUserAmigo2(id);
    this.router.navigate(['/perfil-amigo']);
  }

}
