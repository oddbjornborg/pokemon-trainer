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
    this.trainerService.getPokemonTeam();
  }

  public logout() {
    this.loginService.logout();
  }

}
