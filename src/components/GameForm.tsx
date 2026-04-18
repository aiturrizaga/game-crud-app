import { useEffect, useState } from 'react'
import type { Game, GamePayload } from '../types/game'

interface Props {
    initialData?: Game | null
    onSubmit: (payload: GamePayload) => Promise<void>
    onCancel: () => void
}

const EMPTY_FORM: GamePayload = {
    name: '',
    genre: '',
    rating: 3
}

export const GameForm = ({ onCancel, onSubmit, initialData }: Props) => {
    const [form, setForm] = useState<GamePayload>(EMPTY_FORM)
    const [submitting, setSubmitting] = useState(false)
    const isEditing = Boolean(initialData)

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name,
                genre: initialData.genre,
                rating: initialData.rating
            })
        } else {
            setForm(EMPTY_FORM)
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev: any) => ({
            ...prev,
            [name]: name === 'rating' ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            await onSubmit(form)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>{isEditing ? '✏️ Editar juego' : '➕ Nuevo juego'}</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Nombre
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ej: Hollow Knight"
                        required
                    />
                </label>

                <label style={styles.label}>
                    Género
                    <select
                        style={styles.input}
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un género</option>
                        <option value="Acción">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="RPG">RPG</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Terror">Terror</option>
                    </select>
                </label>

                <label style={styles.label}>
                    Rating (1-10): <strong>{form.rating}</strong>
                    <input
                        style={{ ...styles.input, padding: '4px 0' }}
                        type="range"
                        name="rating"
                        min={1}
                        max={10}
                        value={form.rating}
                        onChange={handleChange}
                    />
                </label>

                <div style={styles.actions}>
                    <button type="button" onClick={onCancel} style={styles.btnSecondary}>
                        Cancelar
                    </button>
                    <button type="submit" disabled={submitting} style={styles.btnPrimary}>
                        {submitting ? 'Guardando...' : isEditing ? 'Actulizar' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: '1.25rem',
        marginBottom: '1.25rem',
    },
    title: { fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    label: { display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, fontWeight: 500 },
    input: {
        marginTop: 4,
        padding: '8px 10px',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        fontSize: 14,
        outline: 'none',
    },
    actions: { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 },
    btnPrimary: {
        padding: '8px 20px',
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: 14,
    },
    btnSecondary: {
        padding: '8px 20px',
        background: 'transparent',
        border: '1px solid #d1d5db',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 14,
    },
}