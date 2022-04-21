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
email:string;
usuario :Usuario={}
//para las publicaciones:
pestania=1;
posts:Post[]=[];
media:Post[]=[];
msj:Post[]=[];
guardados:Post[]=[];
  scrollable=true;
  constructor(private us:UsuarioService,
    
    private peticionesService:PeticionesService,
    private modalController:ModalController) { }

  async ngOnInit() {
    this.email=this.us.getEmail();
    console.log(this.email);

    this.usuario= this.us.getUsuario();

   this.usuario.imagen=await this.us.getFotoPerfil(this.usuario._id);
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
        
        
        this.peticionesService.getPublicacionesPerfilPorEmail(this.email).subscribe(publicaciones=>console.log(publicaciones)
        );   
        
      }
    
      //para las publicaciones
      loadData() {
        this.peticionesService.getPublicacionesPerfilPorEmail(this.email).subscribe(a=>{
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
