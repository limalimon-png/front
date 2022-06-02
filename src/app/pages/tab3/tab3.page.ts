import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';
import { PeticionesService } from '../../services/peticiones.service';
import { ModalController } from '@ionic/angular';
import { PopoverPerfilPage } from '../popover-perfil/popover-perfil.page';
import { GuardadosService } from '../../services/guardados.service';
import { LikesService } from '../../services/likes.service';
import { MovilStorageService } from '../../services/movil-storage.service';
declare var window:any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit{
usuario :Usuario={}
imagen;


//para las publicaciones:
pestania=1;
posts:Post[]=[];
media:Post[]=[];
msj:Post[]=[];
guardados:Post[]=[];
likes:Post[]=[];
  scrollable=true;
  constructor(private userService:UsuarioService,
    private publicacionesGuardadas:GuardadosService,
    private peticionesService:PeticionesService,
    private modalController:ModalController,
    private likeService:LikesService,
    private movilStorage:MovilStorageService
    ) {}

  
  async ngOnInit() {
      
   this.usuario= this.userService.getUsuario();

   this.usuario.imagen=await this.userService.getFotoPerfil(this.usuario._id);
   this.usuario.imagen=window.Ionic.WebView.convertFileSrc(this.usuario.imagen)
  console.log('url imagen',this.usuario.imagen);
  
   
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
      
    });
    modal.onDidDismiss().then(async ()=>{
      this.usuario=await this.userService.getUsuario();
      this.usuario.imagen=await this.userService.getFotoPerfil(this.usuario._id);
      

    });
  
     return await modal.present();
     
     
     
  
  
    
    
  }


  //para las publicaciones
  async loadData() {
    this.posts=[];
    this.msj=[];

    this.peticionesService.getPublicacionesPerfil(this.usuario._id).subscribe(a=>{
      this.posts.push(...a.posts.filter(f=> f.img.length !=0));
      this.msj.push(...a.posts.filter(f=> f.img.length ==0));
      //  if(event){
      //    event.target.complete();

        if(a.posts.length==0){
          this.scrollable=false;
        }
      // }
      
    });
    await this.publicacionesGuardadas.cargarFavoritos().then(
      pelis=>this.guardados=pelis);
  }

  async opcionPerfil(numOpcion:number){
    this.pestania=numOpcion;
    
    if(this.pestania==4){
      await this.publicacionesGuardadas.cargarFavoritos().then(
        pelis=>this.guardados=pelis);
    }else if(this.pestania==3){
     this.likes= this.movilStorage.getLocalPostLike()
    }

    this.likeService.like(this.usuario._id,'6215f21953d82c8d4b825bdbaaaa');


  }
 


  ionViewWillEnter() {
    this.msj=[];
    this.posts=[];

  this.loadData();
  }

}
