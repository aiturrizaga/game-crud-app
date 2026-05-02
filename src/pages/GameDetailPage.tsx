import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Game } from '../types/game'
import { fetchGameById } from '../api/game.api'

const GENRE_EMOJI: Record<string, string> = {
    'Acción': '⚡',
    'Aventura': '🌍',
    'RPG': '⚔️',
    'Estrategia': '🧠',
    'Deportes': '⚽',
    'Terror': '👻',
}

export const GameDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [game, setGame] = useState<Game | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        fetchGameById(Number(id))
            .then(setGame)
            .catch(() => setError('Juego no encontrado'))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p style={styles.info}>Cargando...</p>
    if (error || !game) return <p style={styles.error}>{error ?? 'Error inesperado'}</p>

    return (
        <div style={styles.container}>
            {/* Navegacion */}
            <Link to="/" style={styles.back}>
                Volver a la lista
            </Link>

            {/* Detalle */}
            <div style={styles.card}>
                <div style={styles.iconBig}>{GENRE_EMOJI[game.genre] ?? '🎮'}</div>
                <h1 style={styles.name}>{game.name}</h1>
                <p style={styles.genre}>{game.genre}</p>
                <p style={styles.rating}>⭐ {game.rating} / 10</p>
                <p style={styles.id}>ID: {game.id}</p>
            </div>

            {/* Acciones */}
            <div style={styles.actions}>
                <button
                    onClick={() => navigate(`/games/${id}/edit`)}
                    style={styles.btnEdit}
                >
                    ✏️ Editar este juego
                </button>
            </div>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 480,
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: 'system-ui, sans-serif',
    },
    back: {
        display: 'inline-block',
        marginBottom: '1.25rem',
        fontSize: 14,
        color: '#6366f1',
        textDecoration: 'none',
        fontWeight: 500,
    },
    card: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 14,
        padding: '2rem',
        textAlign: 'center',
    },
    iconBig: {
        fontSize: 56,
        marginBottom: '0.75rem',
    },
    name: { fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px' },
    genre: { color: '#6b7280', fontSize: 14, margin: '0 0 8px' },
    rating: { fontSize: '1.1rem', margin: '0 0 4px' },
    id: { fontSize: 12, color: '#9ca3af', margin: 0 },
    actions: {
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
    },
    btnEdit: {
        padding: '10px 24px',
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: 14,
    },
    info: { textAlign: 'center', color: '#6b7280', marginTop: '4rem' },
    error: { textAlign: 'center', color: '#dc2626', marginTop: '4rem' },
}