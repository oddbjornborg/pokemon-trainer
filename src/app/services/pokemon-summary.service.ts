import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, PokemonStats, PokemonSummary } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class PokemonSummaryService {
  private _pokemonSummary?: PokemonSummary;
  private _pokemonStats?: PokemonStats;
 


  constructor(private readonly http: HttpClient) {}

  get summary(): PokemonSummary {
    return this._pokemonSummary!
  }

  get stats(): PokemonStats {
    return this._pokemonStats!
  }

  public fetchPokemonStats( pokemon: Pokemon) {
  
    
    this.http.get<PokemonSummary>(pokemon.url)
    .subscribe({
      next: (response: PokemonSummary) => {
        this._pokemonSummary = response;
        this._pokemonStats = {
          image: pokemon.image,
          name: pokemon.name,
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[2].base_stat,
          special_attack: response.stats[3].base_stat,
          special_defense: response.stats[4].base_stat,
          speed: response.stats[5].base_stat,
        };
        StorageUtil.save(StorageKeys.PokemonSummary, this._pokemonStats);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
/* 
public findAllGuitars(): void {
  if (this._guitars.length > 0 || this.loading) {
    return;
  }

  this._loading = true;
  this.http
    .get<Guitar[]>(apiGuitars)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    ) */