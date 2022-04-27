import { Component } from '@angular/core';
import { Post } from './interfaces/interfaces';
import { MovilStorageService } from './services/movil-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //carga los post con like
  
  get postLike():Post[]{
    return this.storageService.getLocalPostLike()
  }
  constructor(private storageService:MovilStorageService) {

  }
}
