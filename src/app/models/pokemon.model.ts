export interface Pokemon {
    id: number;
    name: string;
    image: string
    url: string;
}

export interface PokemonStats {
    image: string;
    name: string;
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

export interface PokemonSummary {
    id: number;
    name: string;
    stats: StatsResponse[];
}

export interface StatsResponse {
    base_stat: number
}

export interface PokemonResult {
    name: string;
    url: string;
}

export interface PokemonByNameResponse {
    id: number;
    name: string;
    sprites: {
        front_default: string
    };
}