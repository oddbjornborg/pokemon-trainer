import { Component, Input, OnInit } from '@angular/core';
import { PokemonStats } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.css']
})
export class PokemonStatsComponent implements OnInit {

  @Input() stats!: PokemonStats


  constructor() { }

  ngOnInit(): void {
  }

}
