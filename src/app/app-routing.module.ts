import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpformComponent } from './empform/empform.component';
import { EmpdetComponent } from './empdet/empdet.component';
import { PagenotfoundComponent } from './pagenotfound.component';

const routes: Routes = [
    { path: "", redirectTo: "/empdet", pathMatch: 'full' },
    { path: "empform", component: EmpformComponent },
    { path: "empdet", component: EmpdetComponent },
    { path: "**", component:PagenotfoundComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }