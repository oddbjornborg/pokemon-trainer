import { Component, OnInit } from '@angular/core';
import { PokemonStats } from 'src/app/models/pokemon.model';
import { PokemonSummaryService } from 'src/app/services/pokemon-summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.css'],
})
export class SummaryPage implements OnInit {
  public pokemonStats?: PokemonStats;

  get stats(): PokemonStats {
    return this.serviceSummary.stats!;
  }

  constructor(private readonly serviceSummary: PokemonSummaryService) {}

  ngOnInit(): void {
    
  }
}
