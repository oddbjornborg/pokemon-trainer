import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ButtonState } from 'src/app/enums/button-state.enum';
import { Pokemon} from 'src/app/models/pokemon.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonSummaryService } from 'src/app/services/pokemon-summary.service';
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
    return this._buttonState !== ButtonState.Hidden;
  }

  get isBeingAdded(): boolean {
    return this._buttonState === ButtonState.BeingAdded;
  }

  @Input() pokemon?: Pokemon;
 
  constructor(
    private trainerService: TrainerService,
    private readonly favoritesService: FavoriteService,
    private router: Router,
    private readonly summaryService: PokemonSummaryService
  ) { }

  ngOnInit(): void {
    this.isInTeam = this.trainerService.inTeam(this.pokemon!.name)

    this._buttonState = this.isInTeam ? ButtonState.Present : ButtonState.Hidden;
    
  }

  onIChooseYouClick() : void {
    this.loading = true;
    this.isInTeam = !this.isInTeam;

    // Animate adding pokeball
    if(this.isInTeam) {
      this._buttonState = ButtonState.BeingAdded;
      setTimeout(() => {
        this._buttonState = ButtonState.Present;
      }, 1000)
    } 
    // Animate pokeball removal
    else {
      this._buttonState = ButtonState.BeingRemoved;
      setTimeout(() => {
        this._buttonState = ButtonState.Hidden;
      }, 250);
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
          console.log('ERROR', error.message);
        }
      })
  }

  onSummaryClick(pokemon: Pokemon): void{
    this.summaryService.fetchPokemonStats(pokemon)
    this.router.navigateByUrl("/summary")
  }

}
