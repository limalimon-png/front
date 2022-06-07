import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonRefresher } from '@ionic/angular';
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
  prueba=1
 

  constructor(private peticion:PeticionesService) {}
  ngOnInit() {
    this.peticion.getPosts(true).subscribe(a=>{
      // console.log(a);
       this.posts.push(...a.posts);
       
         if(a.posts.length==0){
           this.scrollable=false;
         }
       
       
     });
  }


  loadData(event?, refresh:boolean=false) {

   console.log(event);
   
    
    this.peticion.getPosts(refresh).subscribe(a=>{
     // console.log(a);
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

ionViewWillEnter() {
  console.log('vuelve a entrar');
  
}
}
