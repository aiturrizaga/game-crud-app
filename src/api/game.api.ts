import type { Game } from '../types/game';

const BASE_URL = 'https://game-crud-api.vercel.app/api/games'

export async function fetchGames(): Promise<Game[]> {
    const res = await fetch(BASE_URL)
    return res.json()
}

export async function removeGame(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
}