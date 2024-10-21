import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpdetComponent } from './empdet/empdet.component';
import { EmpformComponent } from './empform/empform.component';
import { PagenotfoundComponent } from './pagenotfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { ValidatePipe } from './validate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmpdetComponent,
    EmpformComponent,
    PagenotfoundComponent,
    ValidatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
