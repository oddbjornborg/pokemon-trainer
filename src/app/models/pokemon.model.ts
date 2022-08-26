export interface Pokemon {
    id: number;
    name: string;
    stats: PokemonStats;
    types: string[];
    ability: string;
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

export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
    length: number;
}

export interface PokemonResult {
    name: string;
    url: string;
}