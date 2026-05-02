import { Route, Routes } from 'react-router-dom'
import GamesPage from './pages/GamesPage'
import { GameNewPage } from './pages/GameNewPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<GamesPage />} />
      <Route path='/games/new' element={<GameNewPage />} />
    </Routes>
  )
}

export default App
