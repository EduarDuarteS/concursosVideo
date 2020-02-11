import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from '../material.module';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DialogOverviewExampleDialog } from "./cursos/lista-cursos/lista-cursos.component";

// Modulos
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { HttpClientModule  } from '@angular/common/http';
import { VideoModalModule } from './video-modal/video-modal.module';
import { VideoAlumnoModule } from './video-alumno/video-alumno.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {ToastrModule} from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GestureConfig } from '@angular/material';
import { HomeComponent } from './pagesInit/home/home.component';
import { ConcursosComponent } from './pagesInit/concursos/concursos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DialogOverviewExampleDialog,
    HomeComponent,
    ConcursosComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    YoutubePlayerModule,
    VideoModalModule,
    VideoAlumnoModule,
    ModalModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot()
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}} ,
    { provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
