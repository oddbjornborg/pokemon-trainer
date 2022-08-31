import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { ButtonState } from 'src/app/enums/button-state.enum';
import { Pokemon} from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {
  public loading: boolean = false;
  public isInTeam: boolean = false;
  private _buttonState: number = 0;

  get isBeingRemoved(): boolean {
    return this._buttonState === ButtonState.BeingRemoved;
  }

  get isPresent(): boolean {
    return this._buttonState === ButtonState.Present;
  }

  get isVisible(): boolean {
    return this._buttonState !== ButtonState.Hidden
  }

  @Input() pokemon?: Pokemon;
 
  constructor(
    private trainerService: TrainerService,
    private readonly favoritesService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.isInTeam = this.trainerService.inTeam(this.pokemon!.name)

    this._buttonState = this.isInTeam ? ButtonState.Present : ButtonState.Hidden;
  }

  onIChooseYouClick() : void {
    this.loading = true;

    if(this.isInTeam) {
      this._buttonState = ButtonState.BeingRemoved;
      setTimeout(() => {
        this._buttonState = ButtonState.Hidden;
      }, 250);
    }

    this.isInTeam = !this.isInTeam;

    if(this.isInTeam) {
      this._buttonState = ButtonState.Present;
    }

    this.favoritesService.addToFavorites(this.pokemon!.name)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: ()=> {
          this.isInTeam = this.trainerService.inTeam(this.pokemon!.name)
        },
        error: (error: HttpErrorResponse) =>{
          console.log('ERROR', error.message)
        }
      })
  }

}
