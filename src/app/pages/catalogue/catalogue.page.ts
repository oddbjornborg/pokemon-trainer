import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Pokemon, PokemonResult } from 'src/app/models/pokemon.model';
import { PaginationService } from 'src/app/services/pagination.service';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit, DoCheck {

  private _paginationPage: number = 0;

  get pokemon(): Pokemon[] {
    return this.pokemonCatalogueService.pokemon;
  } 

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  get paginationElements(): string[] {
    return this.paginationService.paginationElements;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly paginationService: PaginationService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogueService.fetchPokemonPage(this.paginationService.lastAccessedPage || 0);
    this.paginationService.getFinalPageNumber();
    this.paginationService.setPaginationElements();
  }

  ngDoCheck(): void {
    if(this._paginationPage !== this.paginationService.currentPage) {
      this._paginationPage = this.paginationService.currentPage;
      this.paginationService.setPaginationElements();
      console.log(this.paginationElements);
    }
  }

  public getNewPage(pageNumber: number) {
    this.pokemonCatalogueService.fetchPokemonPage(pageNumber);
  }

}
