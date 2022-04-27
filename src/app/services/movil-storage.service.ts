import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Like, Post } from '../interfaces/interfaces';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class MovilStorageService {
  private _storage: Storage | null = null;
  private localPostLike : Post[]=[]

  //iniciarlo en el appcomponentModule n
  // get postLike():Post[]{
  //   return this.storageService.getLocalPostLike
  // }

  constructor(private storage: Storage,
    private likeService:LikesService
    ) {
    this.init();
   }


   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    //this.likeService.getPostLike();
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarPostLike();
  }

 async saveRemoveLikePost(something:Post){
   const exists =this.localPostLike.find(localLikes=>localLikes._id===something._id)
   if(exists){
     this.localPostLike=this.localPostLike.filter(local=>local._id!== something._id);
   }else{
     this.localPostLike=[something,...this.localPostLike]
   }

   this._storage.set('likes',this.localPostLike)

 }

 async cargarPostLike(){
   try{
     const posts=await this._storage.get('likes');
     this.localPostLike=posts||[];

   }catch(error){

   }

 }

 getLocalPostLike(){
   return[...this.localPostLike]
 }

 postLiked(post:Post){
   return !!this.localPostLike.find(local=>local._id===post._id);
 }
 

}
