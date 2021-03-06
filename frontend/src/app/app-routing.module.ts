import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pagesInit/home/home.component';
import { ConcursosComponent } from './pagesInit/concursos/concursos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './services/usuario/auth.service';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: NavbarComponent,
    canActivate: [AuthService],
    children: [
      {
        path: 'eventos',
        loadChildren: './cursos/cursos.module#CursosModule',
        data: { preload: true }
      },
      {
        path: 'ver/:concurso',
        loadChildren: './cursos/cursos.module#CursosModule',
        data: { preload: true }
      },
      {
        path: 'contenido-interactivo',
        loadChildren: './contenido-interactivo/contenido-interactivo.module#ContenidoInteractivoModule',
        canActivate: [AuthGuard],
        data: { preload: true }
      },
      {
        path: 'load-videos',
        loadChildren: './pages/pages.module#PagesModule',
        canActivate: [AuthGuard],
        data: { isAlumno: true }
      },
      {
        path: 'page',
        loadChildren: './pages/pages.module#PagesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'video',
        loadChildren: './video-modal/video-modal.module#VideoModalModule',
        data: { preload: true }
      },
      {
        path: 'video-alumno',
        loadChildren: './video-alumno/video-alumno.module#VideoAlumnoModule',
        data: { preload: true }
      },
    ]
  },
  { path: ':path', component: ConcursosComponent },
  { path: '', component: HomeComponent },
  { path: 'home/info', component: HomeComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'cursos', component: NopagefoundComponent },
  { path: 'contenido', component: NopagefoundComponent },
  { path: 'video', component: NopagefoundComponent },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
