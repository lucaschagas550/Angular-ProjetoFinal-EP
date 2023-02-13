import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from './../models/usuario';
import { ContaService } from '../services/conta.service';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  //Obtem todos dados do DOM(HTML)
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  errors: any[] = [];
  cadastroForm!: FormGroup; // FormGroup para model e validar os campo do formulario
  usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private toastr: ToastrService,) {

    super();

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

    super.configurarMensagensValidacaoBase(this.validationMessages);
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
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
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

      this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);
    let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!',
      {
        progressBar: true,
      });

    this.mudancasNaoSalvas = false;
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
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
