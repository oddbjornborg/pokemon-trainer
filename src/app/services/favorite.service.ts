import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';
const { apiKey, apiTrainers, apiPokemon } = environment;

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) {}

  public addToFavorites(name: string): Observable<Trainer> {
    if (!this.trainerService.trainer) {
      throw new Error('addToFavorites: There is no trainer');
    }

    const trainer: Trainer = this.trainerService.trainer;
    const pokemon: Pokemon | undefined = this.pokemonService.pokemonByName(name);

    if (!pokemon) {
      throw new Error('addToFavorites: No pokemon with id: ' + name);
    }

    if (this.trainerService.inTeam(name)) {
      console.log("Pokemon already in team; removed from team.")
      this.trainerService.removePokemon(name);
    } else {
      console.log("Added pokemon to team!")
      this.trainerService.addPokemon(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    return this.http
      .patch<Trainer>(
        `${apiTrainers}/${trainer.id}`,
        { pokemon: [...trainer.pokemon] },
        { headers }
      )
      .pipe(
        tap((updatedTrainer: Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        })
      );
  }
}

