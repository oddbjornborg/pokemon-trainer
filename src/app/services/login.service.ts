import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.utils';
import { TrainerService } from './trainer.service';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly trainerService: TrainerService
    ) { }

  public login(username: string) {
    this.http.get<Trainer[]>(environment.apiTrainers + "?username=" + username)
  }

  public logout() {
    this.trainerService.removeTrainerStorage();
    this.router.navigateByUrl("/");
  }
}
