import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  public loading: boolean = false;

  @Output() register: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly registerService: RegisterService,
    private readonly trainerService: TrainerService
  ) { }

  public registerSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;

    this.registerService.register(username);
  }

}
