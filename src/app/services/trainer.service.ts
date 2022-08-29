import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { PokemonResult } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;
  private _pokemon: PokemonResult[] = [];

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.save<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  get pokemon(): PokemonResult[] {
    return this._pokemon;
  }

  constructor() {
    this._trainer = StorageUtil.read<Trainer>(StorageKeys.Trainer);
  }

  public addPokemon(pokemon: PokemonResult) {
    this._pokemon.push(pokemon);
    StorageUtil.save<PokemonResult[]>(StorageKeys.PokemonTeam, this._pokemon);
  }

  public removePokemon(name: string) {
    this._pokemon = this._pokemon.filter((pokemon) => pokemon.name !==  name);
    StorageUtil.save<PokemonResult[]>(StorageKeys.PokemonTeam, this._pokemon);
  }




}
