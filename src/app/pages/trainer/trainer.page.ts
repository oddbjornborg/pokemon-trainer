import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PokemonTeamService } from 'src/app/services/pokemon-team.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get loading(): boolean {
    return this.pokemonTeamService.loading;
  }

  constructor(
    private readonly loginService: LoginService,
    private readonly pokemonTeamService: PokemonTeamService,
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.loginService.logout();
  }

  private loadPokemonOnInit(): void {
    const pokemonTeam = this.trainerService.pokemon;
    for (const pokemon of pokemonTeam) {
      
    }
  }

}
