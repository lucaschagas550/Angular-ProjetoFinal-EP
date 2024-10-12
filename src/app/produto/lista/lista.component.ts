import { Component, OnDestroy, OnInit } from '@angular/core';
import { Produto } from '../models/produto';
import { ProdutoService } from '../services/produto.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit, OnDestroy {

  imagens: string = environment.imagensUrl;

  produtosSubs !: Subscription;
  public produtos!: Produto[];
  errorMessage!: string;

  constructor(private produtoService: ProdutoService) { }


  ngOnInit(): void {
    this.produtosSubs = this.produtoService.obterTodos()
      .subscribe({
        next: (produtos) => this.produtos = produtos,
        error: () => this.errorMessage
      });
  }

  ngOnDestroy(): void {
    this.produtosSubs.unsubscribe();
  }
}
