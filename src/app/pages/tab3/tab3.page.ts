import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';
import { PeticionesService } from '../../services/peticiones.service';
import { ModalController } from '@ionic/angular';
import { PopoverPerfilPage } from '../popover-perfil/popover-perfil.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
usuario :Usuario={}
//para las publicaciones:
pestania=1;
posts:Post[]=[];
media:Post[]=[];
msj:Post[]=[];
  scrollable=true;
  constructor(private userService:UsuarioService,
    
    private peticionesService:PeticionesService,
    private modalController:ModalController
    ) {}
  ngOnInit(): void {
   this.usuario=this.userService.getUsuario();
   console.log(this.usuario);
   this.mostrarPublicaciones();
   //para luego mpodificar los datos de dentro usaremos en el input un [(ngmodel)]


   //para las publicaciones del perfil

   this.loadData();
  this.peticionesService.nuevaPublicacion.subscribe(publicacion=>{
    this.posts.unshift(publicacion);
  })
   
  }

  


  logout(){
    this.peticionesService.paginaPost=0;
    this.userService.logout();
  }


  mostrarPublicaciones(){
    
    
    this.peticionesService.getPublicacionesPerfil(this.usuario._id).subscribe(publicaciones=>console.log(publicaciones)
    );   
    
  }

  async editarPerfil() {
    const modal = await this.modalController.create({
      component: PopoverPerfilPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
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
