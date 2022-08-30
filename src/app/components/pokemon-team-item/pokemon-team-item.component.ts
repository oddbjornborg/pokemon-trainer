import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-team-item',
  templateUrl: './pokemon-team-item.component.html',
  styleUrls: ['./pokemon-team-item.component.css']
})
export class PokemonTeamItemComponent implements OnInit {

  @Input() pokemon?: Pokemon;

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

  public removeOnClick(pokemon: Pokemon) {
    this.trainerService.removePokemon(pokemon.name);
  }

}
