import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil-amigo',
  templateUrl: './perfil-amigo.page.html',
  styleUrls: ['./perfil-amigo.page.scss'],
})
export class PerfilAmigoPage implements OnInit {

usuario :Usuario={}
//para las publicaciones:
pestania=1;
posts:Post[]=[];
media:Post[]=[];
msj:Post[]=[];
guardados:Post[]=[];
  scrollable=true;
  constructor(private us:UsuarioService,
    //pasar el usuario por el get del email
    private peticionesService:PeticionesService,
    private modalController:ModalController) { }

  async ngOnInit() {
    
  

    this.usuario= await this.us.getUserAmigo();

   //this.usuario.imagen=this.usuario.imagen
   ;
   

   console.log(this.usuario);
   this.mostrarPublicaciones();
   
   
  console.log(this.guardados);
  //para luego mpodificar los datos de dentro usaremos en el input un [(ngmodel)]


   //para las publicaciones del perfil

   this.loadData();
  this.peticionesService.nuevaPublicacion.subscribe(publicacion=>{
    this.posts.unshift(publicacion);
  })
    
  }



  
    mostrarPublicaciones(){
        
        
        this.peticionesService.getPublicacionesPerfil(this.usuario._id).subscribe(publicaciones=>console.log(publicaciones)
        );   
        
      }
    
      //para las publicaciones
      loadData() {
        this.peticionesService.getPublicacionesPerfil(this.usuario._id).subscribe(a=>{
          console.log(a);
          this.posts.push(...a.posts.filter(f=> f.img.length !=0));
          this.msj.push(...a.posts.filter(f=> f.img.length ==0));
          //  if(event){
          //    event.target.complete();
    
            if(a.posts.length==0){
              this.scrollable=false;
            }
          // }
          
        });
      }
    
      opcionPerfil(numOpcion:number){
        this.pestania=numOpcion;
    
    
      }
     

}
