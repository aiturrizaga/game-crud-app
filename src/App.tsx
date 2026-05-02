import { Route, Routes } from 'react-router-dom'
import GamesPage from './pages/GamesPage'
import { GameNewPage } from './pages/GameNewPage'
import { GameDetailPage } from './pages/GameDetailPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<GamesPage />} />
      <Route path='/games/new' element={<GameNewPage />} />
      <Route path='/games/:id' element={<GameDetailPage />} />
    </Routes>
  )
}

export default App
