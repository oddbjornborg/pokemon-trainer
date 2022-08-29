import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-team-list',
  templateUrl: './pokemon-team-list.component.html',
  styleUrls: ['./pokemon-team-list.component.css']
})
export class PokemonTeamListComponent implements OnInit {

  get pokemonTeam(): Pokemon[] {
    return this.trainerService.pokemon;
  }

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

}
