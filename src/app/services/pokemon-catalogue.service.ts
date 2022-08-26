import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonResponse, PokemonResult } from '../models/pokemon.model';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: PokemonResult[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemon(): PokemonResult[] {
    return this._pokemon;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient
  ) { }

  public findSomePokemon() {
    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemon + "?limit=20&offset=0")
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: PokemonResponse) => {
          this._pokemon = pokemon.results;
          console.log(this._pokemon);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      }
      )
  }
}
