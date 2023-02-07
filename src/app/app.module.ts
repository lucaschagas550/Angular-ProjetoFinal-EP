import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.handler.service';

//Interceptor vai ser passado para classe ErrorInterceptor que eh o error.handler.service
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

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
    ToastrModule.forRoot(), // Toastr exibe mensagem ao usuario na tela, pela aplicacao toda por isso esta sendo resolvido neste modulo
    HttpClientModule, //modulo para utilzar requisicao http

  ],
  providers: [
    httpInterceptorProviders //Interceptor de request
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
