export interface Game {
    id: number;
    name: string;
    genre: string;
    rating: number;
}

export type GamePayload = Omit<Game, 'id'>