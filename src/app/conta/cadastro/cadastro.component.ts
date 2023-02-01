import { ValidationMessages, GenericValidator, DisplayMessage } from './../../utils/generic-form-validation';
import { Usuario } from './../models/usuario';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../services/conta.service';
import { Router } from '@angular/router';

import { CustomValidators } from '@narik/custom-validators';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  //Obtem todos dados do DOM(HTML)
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  errors: any[] = [];
  cadastroForm!: FormGroup; // FormGroup para model e validar os campo do formulario
  usuario!: Usuario;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));//Blur sempre que tira o foco de algum elemento do form dispara um evento

    merge(...controlBlurs).subscribe(() => {//para cada evento(controlBlurs) sera processado uma mensagem
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }

  adicionarConta(): void {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      //mapeando os valores para um objeto do tipo usuario com valores do formulario
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario)
        .subscribe({
          next: (sucesso) => { this.processarSucesso(sucesso) },
          error: (falha) => { this.processarFalha(falha) },
        });
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    this.router.navigate(['/home']);
  }

  processarFalha(fail: any) {
    console.log(fail);
    this.errors = fail.error?.errors;
  }

}
