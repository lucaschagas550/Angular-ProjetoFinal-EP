import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utils/generic-form-validation';

export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    genericValidator!: GenericValidator;
    validationMessages!: ValidationMessages;

    mudancasNaoSalvas!: boolean;

    protected configurarMensagensValidacaoBase(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    protected configurarValidacaoFormularioBase(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')); //Blur sempre que tira o foco de algum elemento do form dispara um evento

        merge(...controlBlurs).subscribe(() => { //para cada evento(controlBlurs) sera processado uma mensagem
            this.validarFormulario(formGroup)
        });
    }

    protected validarFormulario(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processarMensagens(formGroup);
        this.mudancasNaoSalvas = true;  //Utilizado no guard para avisar  que ira perder os dados da alteracao ao sair da tela
    }

    protected validarFormularioSubmit(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processarMensagensSubmit(formGroup);
        this.mudancasNaoSalvas = true; //Utilizado no guard para avisar o usuario que ira perder os dados da alteracao ao sair da tela
    }
}