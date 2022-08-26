import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public handleLogin(): void {
    this.router.navigateByUrl("/catalogue");
  }

}
