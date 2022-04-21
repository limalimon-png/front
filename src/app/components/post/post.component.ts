import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { GuardadosService } from '../../services/guardados.service';

import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  iconoGuardado='bookmark-outline';
  @Input() post:Post={};
  img='/assets/perro-1.jpg';
  img2='/assets/perro-2.jpg';
  img3='/assets/perro-3.jpg';
  constructor(private datalocal:GuardadosService,private ruta:Router,private us:UsuarioService) { }

  ngOnInit() {
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
    this.us.setEmail(this.post.usuario.email);
    this.ruta.navigate(['/perfil-amigo'])
  }

}
