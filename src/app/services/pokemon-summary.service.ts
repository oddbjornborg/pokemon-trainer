import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonStats } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonSummaryService {
  private _pokemonStats?: PokemonStats;

  constructor(
    private readonly http: HttpClient
  ) { }

  get stats(): PokemonStats{
    return this._pokemonStats!
  }


  public fetchPokemonStats(url : string){
    this.http.get<PokemonStats>(url)
    .subscribe({
      next: (response: PokemonStats) => {
        this._pokemonStats = response
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    })
  }
}


