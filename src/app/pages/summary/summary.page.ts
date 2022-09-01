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

  public stats: PokemonStats | undefined;

  constructor(
    private readonly pokemonSummaryService: PokemonSummaryService
  ) {}

  ngOnInit(): void {
    const storedSummary = StorageUtil.read<PokemonStats>(StorageKeys.PokemonSummary);
    if(storedSummary === undefined) {
      this.stats = this.pokemonSummaryService.stats;
    }
    else {
      this.stats = storedSummary;
    }
  }
}
