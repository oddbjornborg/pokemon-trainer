import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css']
})
export class RegisterPage implements OnInit {

  get registered(): boolean {
    return this.registerService.registered;
  }

  get error(): string | undefined {
    return this.registerService.error;
  }

  get loading(): boolean {
    return this.registerService.loading;
  }

  constructor(
    private readonly registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.registerService.registered = false;
  }

}
