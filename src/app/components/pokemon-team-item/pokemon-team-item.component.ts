import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-team-item',
  templateUrl: './pokemon-team-item.component.html',
  styleUrls: ['./pokemon-team-item.component.css']
})
export class PokemonTeamItemComponent implements OnInit {

  @Input() pokemon?: Pokemon;

  constructor() { }

  ngOnInit(): void {
    if(!this.pokemon) {
      this.pokemon = {
        id: 0,
        name: "missingNo",
        image: "none",
        url: "none"
      }
    }
  }

}
