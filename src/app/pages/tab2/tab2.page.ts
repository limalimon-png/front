import { Component } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages:string[]=[];

  post={
    mensaje:'',
    coords:null,
    posicion:false
  }
  constructor(private peticionesService:PeticionesService) {}


  crearPost(){
    console.log(this.post);
    this.peticionesService.crearPost(this.post);

    
  }

}
