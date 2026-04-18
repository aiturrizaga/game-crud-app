import { useEffect, useState } from 'react'
import GameList from '../components/GameList'
import type { Game, GamePayload } from '../types/game'
import { createGame, fetchGames, removeGame } from '../api/game.api'
import { GameForm } from './../components/GameForm';

export default function GamesPage() {
    const [games, setGames] = useState<Game[]>([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchGames().then(res => {
            setGames(res)
        })
    }, [])

    const handleDelete = async (id: number) => {
        await removeGame(id)
        setGames(prev => prev.filter(g => g.id !== id))
    }

    const handleNew = () => {
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false)
    }

    const handleSubmit = async (payload: GamePayload) => {
        const newGame = await createGame(payload)
        setGames(prev => [...prev, newGame])
        setShowForm(false)
    }

    return (
        <div style={styles.container}>

            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>🎮 Mis videojuegos</h1>
                    <p style={styles.subtitle}>
                        {games.length} juego{games.length !== 1 ? 's' : ''} en la lista
                    </p>
                </div>
                <button onClick={handleNew} type="button" style={styles.btnAdd}>
                    + Agregar
                </button>
            </div>

            {/* Form */}
            {
                showForm && (
                    <GameForm 
                        onCancel={handleCancel}
                        onSubmit={handleSubmit}
                    />
                )
            }

            {/* List */}
            <GameList
                games={games}
                onDelete={handleDelete}
            />

        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 640,
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: 'system-ui, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.25rem',
    },
    title: { fontSize: '1.4rem', fontWeight: 700, margin: 0 },
    subtitle: { fontSize: 13, color: '#6b7280', margin: '4px 0 0' },
    btnAdd: {
        padding: '8px 18px',
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: 14,
    },
    error: {
        padding: '10px 14px',
        background: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: 8,
        color: '#dc2626',
        fontSize: 14,
        marginBottom: '1rem',
    },
    loading: {
        textAlign: 'center',
        color: '#6b7280',
        padding: '2rem',
        fontSize: 14,
    },
}