import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiKey, apiTrainers } = environment

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public register(username: string) {
    this.createTrainer(username);
  }

  private createTrainer(username: string): Observable<Trainer> {
    const trainer = {
      username,
      pokemon: []
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiTrainers, trainer, {
      headers
    });
  }
}
