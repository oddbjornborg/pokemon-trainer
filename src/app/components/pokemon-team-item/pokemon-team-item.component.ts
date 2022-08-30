import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-team-item',
  templateUrl: './pokemon-team-item.component.html',
  styleUrls: ['./pokemon-team-item.component.css']
})
export class PokemonTeamItemComponent implements OnInit {

  private _beingRemoved: boolean = false;

  get beingRemoved(): boolean {
    return this._beingRemoved;
  }

  @Input() pokemon?: Pokemon;

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

  public removeOnClick(pokemon: Pokemon) {
    this._beingRemoved = true;
    setTimeout(() => {
      this.trainerService.removePokemon(pokemon.name);
    }, 500);
  }

}
