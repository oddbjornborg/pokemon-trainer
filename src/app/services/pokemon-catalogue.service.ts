import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';

const { apiPokemon } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemon: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

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
    private readonly http: HttpClient
  ) { }

  public fetchPokemonOnPageLoad() {
    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemon + "?limit=20&offset=0")
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemon: PokemonResponse) => {
          StorageUtil.save(StorageKeys.NextPage, pokemon.next);
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
          console.log(this._pokemon);
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
