import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importar os componentes para a criação das rotats
import { EmployeeCreateComponent } from './componentes/employee-create/employee-create.component';
import { EmployeeEditComponent } from './componentes/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './componentes/employee-list/employee-list.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  // quando nao tiver nenhuma rota especificada que seja redirecionado o usuario http://localhost:4200/home
  {path: '', redirectTo: 'home', pathMatch: 'full'}, // quando nao tiver nenhuma rota especificada que seja redirecionado o usuario
  {path: 'home', component: HomeComponent},
  {path: 'employee-create', component: EmployeeCreateComponent},
  {path: 'employee-edit/:id', component: EmployeeEditComponent},
  {path: 'employee-list', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
