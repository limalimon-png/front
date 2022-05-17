import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad:[UsuarioGuard]
  },
 
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },{
    path:'',
    pathMatch:'full',
    redirectTo:'main/tabs/tab1'
  },
  {
    path: 'popover-perfil',
    loadChildren: () => import('./pages/popover-perfil/popover-perfil.module').then( m => m.PopoverPerfilPageModule)
  },
  {
    path: 'perfil-amigo',
    loadChildren: () => import('./pages/perfil-amigo/perfil-amigo.module').then( m => m.PerfilAmigoPageModule)
  },
  {
    path: 'modal-likes/:id',
    loadChildren: () => import('./pages/modal-likes/modal-likes.module').then( m => m.ModalLikesPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
