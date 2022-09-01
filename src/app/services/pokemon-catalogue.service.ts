import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';
import { PaginationService } from './pagination.service';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get lastAccessedPage(): number | undefined {
    return this.paginationService.lastAccessedPage;
  }

  get pokemon(): Pokemon[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly paginationService: PaginationService
  ) { }

  public fetchPokemonPage(currentPage: number) {

    this.paginationService.currentPage = currentPage;

    if(this.paginationService.pageIsCached()) {
      console.log("Catalogue >> Data cache loaded")
      return;
    }
    console.log("Catalogue >> No cache found")

    this.paginationService.updateLastAccessedPage();
    this._loading = true;

    this.http.get<PokemonResponse>(apiPokemon + "?limit=" + this.paginationService.limit + "&offset=" + this.paginationService.offset)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: PokemonResponse) => {
          this._pokemon = [];

          for (const newPokemon of pokemon.results) {

            const pokemonId: number = Number(newPokemon.url.split("/")[6]) || 0;
            const imageUrl: string = environment.apiImage + pokemonId + ".png";

            this._pokemon.push({
              id: pokemonId,
              name: newPokemon.name,
              image: imageUrl,
              url: newPokemon.url
            })
          }
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public pokemonByName(name: string): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.name === name)
  }
 
}
