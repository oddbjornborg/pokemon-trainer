import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Dependency injection
  constructor(private readonly http: HttpClient) { }

  public login(username: string): Observable<Trainer> {

    // Check if trainer already exists
    return this.checkTrainerExists(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {

          // Trainer did not exist; create new trainer
          if(trainer === undefined) {
            return this.createTrainer(username);
          }

          // Trainer already exists; return trainer
          return of(trainer)
          
        }),
        tap((trainer: Trainer) => {
          StorageUtil.save<Trainer>(StorageKeys.Trainer, trainer);
        })
      )
  }

  private checkTrainerExists(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
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
