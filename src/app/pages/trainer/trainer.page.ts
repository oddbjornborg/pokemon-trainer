import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  constructor(
    private readonly loginService: LoginService,
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    if(this.trainerService.pokemonTracker !== this.trainerService.trainer?.pokemon) {
      console.log("Team changed, invalidated cached data")
      this.trainerService.hasCachedData = false;
    }

    if(this.trainerService.hasCachedData === false) {
      console.log("No cached data; sending data requests")
      this.trainerService.getPokemonTeam();
      this.trainerService.pokemonTracker = this.trainerService.trainer!.pokemon;
      this.trainerService.hasCachedData = true;
    }
    else{
      console.log("Found data cache, no requests sent")
    }
  }

  public logout() {
    this.loginService.logout();
  }

}
