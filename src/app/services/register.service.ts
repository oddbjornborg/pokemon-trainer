import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.model';

const { apiKey, apiTrainers } = environment

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _registered: boolean = false;
  private _error?: string;
  private _loading: boolean = false;
  
  get registered(): boolean {
    return this._registered;
  }

  set registered(newValue: boolean) {
    this._registered = newValue;
  }

  get error(): string | undefined {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(
    private readonly http: HttpClient
  ) { }

  public register(username: string) {
    this.createTrainer(username)
      .subscribe({
        next: () => {
          console.log("Registered new user " + username);
          this._registered = true;
        },
        error: (err: HttpErrorResponse) => {
          this._error = err.message;
          console.log(this._error);
          this._registered = false;
        }
      })
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
