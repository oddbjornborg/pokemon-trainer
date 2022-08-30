import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import { PokemonTeamService } from './pokemon-team.service';

const { apiImage, apiTrainers } = environment;

@Injectable({
  providedIn: 'root',
})
export class TrainerService {
  private _trainer?: Trainer;
  private _pokemon: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      image: apiImage + '1.png',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      id: 4,
      name: 'charmander',
      image: apiImage + '4.png',
      url: 'https://pokeapi.co/api/v2/pokemon/4/',
    },
  ];

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
    private readonly pokemonTeamService: PokemonTeamService,
    private readonly http: HttpClient
  ) {
    this._trainer = StorageUtil.read<Trainer>(StorageKeys.Trainer);
  }

  public addPokemon(pokemon: Pokemon) {
    this._pokemon.push(pokemon);
    StorageUtil.save<Pokemon[]>(StorageKeys.PokemonTeam, this._pokemon);
  }

  public removePokemon(name: string) {
    this._pokemon = this._pokemon.filter((pokemon) => pokemon.name !== name);
    StorageUtil.save<Pokemon[]>(StorageKeys.PokemonTeam, this._pokemon);
  }
}
