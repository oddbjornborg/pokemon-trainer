import { Pokemon } from "./pokemon.model";

export interface Trainer {
    id: number;
    username: string;
    pokemon: string[];
}

export interface TrainerTeam {
    pokemon: string[]
}