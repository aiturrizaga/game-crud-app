import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div style={styles.container}>
            <p style={styles.code}>404</p>
            <h1 style={styles.title}>Página no encontrada</h1>
            <p style={styles.subtitle}>La ruta que buscas no existe.</p>
            <Link to="/" style={styles.link}>← Volver al inicio</Link>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        textAlign: 'center',
        marginTop: '5rem',
        fontFamily: 'system-ui, sans-serif',
    },
    code: {
        fontSize: '5rem',
        fontWeight: 800,
        color: '#e5e7eb',
        margin: 0,
        lineHeight: 1,
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: 700,
        margin: '0.5rem 0 0.25rem',
    },
    subtitle: {
        color: '#6b7280',
        fontSize: 14,
        margin: '0 0 1.5rem',
    },
    link: {
        color: '#6366f1',
        fontWeight: 500,
        fontSize: 14,
        textDecoration: 'none',
    },
}