import { Route, Routes } from 'react-router-dom'
import GamesPage from './pages/GamesPage'
import { GameNewPage } from './pages/GameNewPage'
import { GameDetailPage } from './pages/GameDetailPage'
import { GameEditPage } from './components/GameEditPage'
import NotFoundPage from './components/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<GamesPage />} />
      <Route path='/games/new' element={<GameNewPage />} />
      <Route path='/games/:id' element={<GameDetailPage />} />
      <Route path='/games/:id/edit' element={<GameEditPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
