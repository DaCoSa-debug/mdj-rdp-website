import './styles/globals.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuiSommesNous from './pages/QuiSommesNous'
import Activites from './pages/Activites'
import Evenements from './pages/Evenements'
import Actualites from './pages/Actualites'
import Galerie from './pages/Galerie'
import CIEC from './pages/CIEC'
import EspaceParents from './pages/EspaceParents'
import Emplois from './pages/Emplois'
import Arcade from './pages/Arcade'
import BattleshipLobby from './pages/BattleshipLobby'
import Contact from './pages/Contact'
import Don from './pages/Don'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
        <Route path="/activites" element={<Activites />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/ciec" element={<CIEC />} />
        <Route path="/espace-parents" element={<EspaceParents />} />
        <Route path="/emplois" element={<Emplois />} />
        <Route path="/arcade" element={<Arcade />} />
        <Route path="/arcade/battleship" element={<BattleshipLobby />} />
        <Route path="/arcade/battleship/join/:roomCode" element={<BattleshipLobby />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/don" element={<Don />} />
      </Routes>
    </BrowserRouter>
  )
}
