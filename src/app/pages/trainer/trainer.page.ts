import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(
    private readonly trainerService: TrainerService,
    private readonly loginService: LoginService
  ) { }

  ngOnInit(): void {
    if(this.trainerService.pokemonTracker !== this.trainerService.trainer?.pokemon) {
      this.trainerService.hasCachedData = false;
    }

    if(this.trainerService.hasCachedData === false) {
      // console.log("Trainer >> No cache found")

      this.trainerService.getPokemonTeam();
      this.trainerService.pokemonTracker = this.trainerService.trainer!.pokemon;
      this.trainerService.hasCachedData = true;
    }
    else{
      // console.log("Trainer >> Data cache loaded")
    }
  }

  public logout() {
    this.loginService.logout();
  }

}
