import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavegacaoModule,
    NgbModule, // Bootstrap para angular
    BrowserAnimationsModule, // modulo de animacao utilizado pelo Toastr
    ToastrModule.forRoot() // Toastr exibe mensagem ao usuario na tela, pela aplicacao toda por isso esta sendo resolvido neste modulo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
