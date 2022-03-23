import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from 'src/app/interfaces/interfaces';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  posts:Post[]=[];
  scrollable=true;
 

  constructor(private peticion:PeticionesService) {}
  ngOnInit() {
  this.loadData();
  this.peticion.nuevaPublicacion.subscribe(publicacion=>{
    this.posts.unshift(publicacion);
  })
  }


  loadData(event?, refresh:boolean=false) {

   
    
    this.peticion.getPosts(refresh).subscribe(a=>{
      console.log(a);
      this.posts.push(...a.posts);
      if(event){
        event.target.complete();

        if(a.posts.length==0){
          this.scrollable=false;
        }
      }
      
    });
  }

 


  doRefresh(event) {
  this.loadData(event,true);
  
    this.posts=[];
    this.scrollable=true;
   
  
 
  }


}
