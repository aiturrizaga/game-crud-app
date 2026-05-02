import type { Game, GamePayload } from '../types/game';

const BASE_URL = 'https://game-crud-api.vercel.app/api/games'

export async function fetchGames(): Promise<Game[]> {
    const res = await fetch(BASE_URL)
    return res.json()
}

export async function fetchGameById(id: number): Promise<Game> {
    const res = await fetch(`${BASE_URL}/${id}`)
    if (!res.ok) throw new Error(`El juego con ID: ${id} no existe`)
    return res.json()
}

export async function removeGame(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
}

export async function createGame(payload: GamePayload): Promise<Game> {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    return res.json()
}

export async function updateGame(id: number, payload: GamePayload): Promise<Game> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    return res.json()
}