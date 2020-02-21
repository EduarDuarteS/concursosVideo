import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { MaterialModule } from 'src/material.module';
import { DialogOverviewExampleDialog } from './lista-cursos/lista-cursos.component';
import { VerDetalleComponent } from './ver-detalle/ver-detalle.component';

const routes: Routes = [
  { path: '', component: ListaCursosComponent },
  { path: 'ver/:concurso', component: VerDetalleComponent },

];

@NgModule({
  declarations: [ListaCursosComponent, VerDetalleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class CursosModule { }
