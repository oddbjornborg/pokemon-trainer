import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PokemonByNameResponse } from '../models/pokemon.model';
import { TrainerService } from './trainer.service';

const { apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {

  private _loading: boolean = false;

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly trainerService: TrainerService
  ) { }

  public addPokemonToTeamByName(name: string) {
    this._loading = true;

    const url = apiPokemon + "/" + name;

    this.http.get<PokemonByNameResponse>(url)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (response: PokemonByNameResponse) => {
          const { id, name } = response;
          const { front_default: image } = response.sprites;

          this.trainerService.addPokemon({
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
