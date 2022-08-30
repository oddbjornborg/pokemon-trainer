import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
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
  public isFavorite: boolean = false;


  @Input() pokemon?: Pokemon;
 
  
  constructor(
    private trainerService: TrainerService,
    private readonly favoritesService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.isFavorite = this.trainerService.inFavorites(this.pokemon!.name)
  }

  onIChooseYouClick() : void {
    this.loading = true;

    this.favoritesService.addToFavorites(this.pokemon!.name).subscribe({
      next: ()=> {
        this.loading = false;
        this.isFavorite = this.trainerService.inFavorites(this.pokemon!.name)

      },
      error: (error: HttpErrorResponse) =>{
        console.log('ERROR', error.message)
      }
    })
  }

}
