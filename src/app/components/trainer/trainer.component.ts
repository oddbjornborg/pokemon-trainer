import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  @Output() logoutEvent: EventEmitter<void> = new EventEmitter();

  get trainerName(): string {
    return this.trainerService.trainer!.username;
  }

  constructor(
    private readonly trainerService: TrainerService
  ) { }

  ngOnInit(): void {
  }

  public logoutOnClick() {
    this.logoutEvent.emit();
  }

}
