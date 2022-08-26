import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient
    ) { }

  public login(username: string) {
    return this.http.get<Trainer[]>(environment.apiTrainers + "?username=" + username)
  }
}
