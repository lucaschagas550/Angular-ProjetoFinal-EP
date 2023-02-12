import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { fromEvent, merge, Observable } from 'rxjs';

import { Usuario } from './../models/usuario';
import { ContaService } from '../services/conta.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from './../../utils/generic-form-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //Obtem todos dados do DOM(HTML)
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  errors: any[] = [];
  loginForm!: FormGroup; // FormGroup para model e validar os campo do formulario
  usuario!: Usuario;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private route: ActivatedRoute, //Obter o valor do queryparam que tem url de retorno se acessado por redirecionamento
    private router: Router,
    private toastr: ToastrService,) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl']; //obtem queryparam

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));//Blur sempre que tira o foco de algum elemento do form dispara um evento

    merge(...controlBlurs).subscribe(() => {//para cada evento(controlBlurs) sera processado uma mensagem
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    });
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      //mapeando os valores para um objeto do tipo usuario com valores do formulario
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario)
        .subscribe({
          next: (sucesso) => { this.processarSucesso(sucesso) },
          error: (falha) => { this.processarFalha(falha) },
        });
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);
    let toast = this.toastr.success('Login realizado com Sucesso!', 'Bem vindo!!!',
      {
        progressBar: true,
      });

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.returnUrl
          ? this.router.navigate([this.returnUrl])
          : this.router.navigate(['/home']);
      })
    }
  }

  processarFalha(fail: any) {
    console.log(fail);
    this.errors = fail.error?.errors;

    this.toastr.error('Ocorreu um erro!', 'Opa :(',
      {
        progressBar: true,
      });
  }

}