import { Link, useNavigate } from 'react-router-dom'
import { GameForm } from '../components/GameForm'
import type { GamePayload } from '../types/game'
import { createGame } from '../api/game.api'

export const GameNewPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async(payload: GamePayload) => {
    await createGame(payload)
    navigate('/')
  }

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.back}>Volver a la lista</Link>

      <GameForm 
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
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
}