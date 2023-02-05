import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/string-utils';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent extends FormBaseComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[] = [];

  errors: any[] = [];
  fornecedorForm!: FormGroup;
  fornecedor!: Fornecedor;

  textoDocumento: string = 'CPF (requerido)';
  formResult: string = '';

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

    super();

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento',
        cpf: 'CPF em formato inválido',
        cnpj: 'CNPJ em formato inválido'
      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep: 'CEP em formato inválido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],

      //Por endereco ser uma outra entidade, fica separado alinhada
      endereco: this.fb.group({
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });

    //seta um valor de inicio para o formulario onde tipofornecedor esta eh 1 e ativo eh true
    this.fornecedorForm.patchValue({ tipoFornecedor: '1', ativo: true });
  }

  ngAfterViewInit(): void {

    this.tipoFornecedorForm()?.valueChanges //evendo quando tipo de fornecedor mudar troque a validacao
      .subscribe(() => {
        this.trocarValidacaoDocumento();
        super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm)
        super.validarFormulario(this.fornecedorForm);
      });

    super.configurarValidacaoFormularioBase(this.formInputElements, this.fornecedorForm)
  }

  trocarValidacaoDocumento() {
    if (this.tipoFornecedorForm()?.value === "1") {
      this.documento()?.clearValidators(); //limpa as validacoes para um campo no caso, o campo documento
      this.documento()?.setValidators([Validators.required]); //seta validacao para um campo
      this.textoDocumento = "CPF (requerido)"; // placeholder do campo
    }
    else {
      this.documento()?.clearValidators();
      this.documento()?.setValidators([Validators.required]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }

  tipoFornecedorForm(): AbstractControl | null {
    return this.fornecedorForm.get('tipoFornecedor');
  }

  documento(): AbstractControl | null {
    return this.fornecedorForm.get('documento');
  }

  buscarCep(cep: string) {

    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.fornecedorService.consultarCep(cep)
      .subscribe({
        next: (cepRetorno) => {
          this.preencherEnderecoConsulta(cepRetorno)
        },
        error: (falha) => {
          this.errors.push(falha)
        }
      });
  }

  preencherEnderecoConsulta(cepConsulta: CepConsulta) {

    //preencher valor de um propriedade que eh uma entidade com pathValue
    this.fornecedorForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  adicionarFornecedor() {
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {

      //mapeando os valores para um objeto do tipo fornecedor com valores do formulario {objeto}, tipo, dados
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      // forçando o tipo fornecedor ser serializado como INT
      this.fornecedor.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString());

      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe({
          next: (sucesso) => { this.processarSucesso(sucesso) },
          error: (falha) => { this.processarFalha(falha) }
        });
    }
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];

    this.mudancasNaoSalvas = false;

    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}