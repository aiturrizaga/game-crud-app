import type { Game } from '../types/game';
import GameCard from './GameCard';

interface Props {
    games: Game[],
    onDelete: (id: number) => void,
}

export default function GameList({ games, onDelete }: Props) {

    if (games.length === 0) {
        return (
            <div style={styles.empty}>
                <p>No hay juegos aún.</p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>Agrega uno con el botón de arriba</p>
            </div>
        )
    }

    return (
        <div>
            {
                games.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onDelete={onDelete}
                    />
                ))
            }
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    empty: {
        textAlign: 'center',
        padding: '2rem',
        color: '#6b7280',
        border: '1px dashed #e5e7eb',
        borderRadius: 10,
        fontSize: 14,
    },
}