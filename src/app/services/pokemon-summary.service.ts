import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonStats, PokemonSummary } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.utils';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class PokemonSummaryService {
  private _pokemonSummary?: PokemonSummary;
  private _pokemonStats?: PokemonStats;
  private _pokemon: string = "";

  set pokemon(newValue: string) {
    this._pokemon = newValue;
  }

  get summary(): PokemonSummary {
    return this._pokemonSummary!;
  }

  get stats(): PokemonStats {
    return this._pokemonStats!;
  }

  constructor(
    private readonly http: HttpClient
  ) {}

  public fetchPokemonStats() {

    const cachedPokemon: PokemonStats | undefined = StorageUtil.read<PokemonStats>(StorageKeys.PokemonSummary);

    if(this._pokemon !== "" && cachedPokemon && cachedPokemon.name === this._pokemon) {
      this._pokemonStats = cachedPokemon;
      return;
    }

    if(this._pokemon === "" && cachedPokemon) {
      this._pokemon = cachedPokemon.name;
    }
    
    this.http.get<PokemonSummary>(apiPokemon + "/" + this._pokemon)
    .subscribe({
      next: (response: PokemonSummary) => {
        
        this._pokemonSummary = response;
        this._pokemonStats = {
          image: response.sprites.front_default,
          name: response.name,
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[2].base_stat,
          special_attack: response.stats[3].base_stat,
          special_defense: response.stats[4].base_stat,
          speed: response.stats[5].base_stat,
        };
        
        StorageUtil.save<PokemonStats>(StorageKeys.PokemonSummary, this._pokemonStats);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
