import type { Game } from '../types/game';

interface Props {
    game: Game;
    onDelete: (id: number) => void
    onEdit: (game: Game) => void
}

const GENRE_EMOJI: Record<string, string> = {
    'Acción': '⚡',
    'Aventura': '🌍',
    'RPG': '⚔️',
    'Estrategia': '🧠',
    'Deportes': '⚽',
    'Terror': '👻',
}

function RatingStars({ rating }: { rating: number }) {
    const filled = Math.round(rating / 2)
    return (
        <span title={`${rating}/10`}>
            {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ color: i < filled ? '#f59e0b' : '#d1d5db' }}>★</span>
            ))}
        </span>
    )
}

export default function GameCard({ game, onDelete, onEdit }: Props) {
    const emoji = GENRE_EMOJI[game.genre] ?? '🎮';

    const handleDelete = () => {
        if (confirm(`¿Estas seguro de eliminar "${game.name}"?`)) {
            onDelete(game.id)
        }
    }

    return (
        <div style={styles.card}>
            {/* Icon */}
            <div style={styles.icon}>{emoji}</div>

            {/* Detail */}
            <div style={styles.info}>
                <p style={styles.name}>{game.name}</p>
                <p style={styles.meta}>
                    Acción &nbsp;·&nbsp;
                    <RatingStars rating={game.rating} /> {game.rating}/10
                </p>
            </div>

            {/* Actions */}
            <div style={styles.actions}>
                <button onClick={() => onEdit(game)} type="button" style={styles.btnEdit}>
                    editar
                </button>
                <button onClick={handleDelete} style={styles.btnDelete}>
                    eliminar
                </button>
            </div>
        </div>

    )
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        border: '1px solid #e5e7eb',
        borderRadius: 10,
        marginBottom: 8,
        background: '#fff',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        flexShrink: 0,
    },
    info: { flex: 1 },
    name: { fontWeight: 600, fontSize: 14, margin: 0 },
    meta: { fontSize: 12, color: '#6b7280', margin: '2px 0 0' },
    actions: { display: 'flex', gap: 6 },
    btnEdit: {
        padding: '4px 12px',
        fontSize: 12,
        border: '1px solid #d1d5db',
        borderRadius: 6,
        cursor: 'pointer',
        background: 'transparent',
    },
    btnDelete: {
        padding: '4px 12px',
        fontSize: 12,
        border: '1px solid #fca5a5',
        borderRadius: 6,
        cursor: 'pointer',
        background: 'transparent',
        color: '#dc2626',
    },
}