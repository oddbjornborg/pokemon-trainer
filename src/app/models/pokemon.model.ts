export interface Pokemon {
    id: number;
    name: string;
    stats: PokemonStats;
    types: string[];
    image_url: string;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
}