import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, PokemonByNameResponse } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;
  private _pokemon: Pokemon[] = [];

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.save<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  get pokemon(): Pokemon[] {
    return this._pokemon;
  }

  constructor(
    private readonly http: HttpClient,
  ) {
    this._trainer = StorageUtil.read<Trainer>(StorageKeys.Trainer);
  }

  public addPokemon(pokemon: Pokemon) {
    if(this._trainer) {
      this._pokemon.push(pokemon);
      this._trainer.pokemon.push(pokemon.name);
      StorageUtil.save<Pokemon[]>(StorageKeys.PokemonTeam, this._pokemon);
    }
  }

  public removePokemon(name: string) {
    if(this._trainer) {
      this._pokemon = this._pokemon.filter((pokemon) => pokemon.name !== name);
      this._trainer.pokemon = this._trainer.pokemon.filter(pokemonName => pokemonName !== name);
      StorageUtil.save<Pokemon[]>(StorageKeys.PokemonTeam, this._pokemon);
    }
  }

  public removeTrainerStorage(): void {
    sessionStorage.removeItem(StorageKeys.Trainer);
    sessionStorage.removeItem(StorageKeys.PokemonTeam);
    this._pokemon = [];
    this._trainer = undefined;
  }

  public getPokemonTeam(): void {
    const { pokemon } = this.trainer!;

    for (const singlePokemon of pokemon) {
      this.addPokemonToTeamByName(singlePokemon);
    }
  }

  public inTeam(name: string): boolean {
    if(this._trainer) {
      return Boolean(
        this._trainer.pokemon.find((pokemonName) => pokemonName === name)
      );
    } 
    return false;
  }

  private addPokemonToTeamByName(name: string) {

    const url = apiPokemon + "/" + name;

    this.http.get<PokemonByNameResponse>(url)
      .subscribe({
        next: (response: PokemonByNameResponse) => {
          const { id, name } = response;
          const { front_default: image } = response.sprites;

          this.addPokemon({
            id,
            name,
            image,
            url
          })
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }
}
