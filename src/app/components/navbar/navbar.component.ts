import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public trainerName: string = ""

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
    this.trainerName = this.trainerService.trainer!.username
  }

  



}
