import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { PokemonStats, PokemonSummary } from 'src/app/models/pokemon.model';
import { PokemonSummaryService } from 'src/app/services/pokemon-summary.service';
import { StorageUtil } from 'src/app/utils/storage.utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.css'],
})
export class SummaryPage implements OnInit {

  get stats(): PokemonStats {
    return this.pokemonSummaryService.stats;
  }

  constructor(
    private readonly pokemonSummaryService: PokemonSummaryService
  ) {}

  ngOnInit(): void {
    this.pokemonSummaryService.fetchPokemonStats();
  }
}
