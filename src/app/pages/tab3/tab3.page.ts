import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { AlertasService } from '../../services/alertas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
usuario :Usuario={}
  constructor(private userService:UsuarioService,
    private alertService:AlertasService
    ) {}
  ngOnInit(): void {
   this.usuario=this.userService.getUsuario();
   console.log(this.usuario);
   //para luego mpodificar los datos de dentro usaremos en el input un [(ngmodel)]
   
  }

  //poner la validaxion que cree en la otra app
  async actualizar(parametros:NgForm){
    if(parametros.invalid){return}
    const actualizado =await this.userService.actualizarUsuario(this.usuario);
    console.log(actualizado);
    
    if(actualizado){
      //se actualizo
      this.alertService.presentToast("se actualizo")
    }else{
      //no se pudieron guardar cambios
      this.alertService.presentToast("no se pudieron guardar los cambios")

    }
  }

}
