import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
import Users from './modules/Users'
import Layout from './modules/Layout'
import NotFound from './modules/NotFound'
import Contact from './modules/Contact'
import About from './modules/About'
import SignIn from './modules/SignIn'
import SignUp from './modules/SignUp'
import Rol from './modules/Rols'
import Speciality from './modules/Speciality'
import SolicitarTurno from './modules/Paciente/Turno'
import HistorialTurnos from './modules/Paciente/TurnoHistory'

function App() {
  return (
    <div className="Home">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="contact" element={<Contact />}>
              <Route path=":type" element={<Contact />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="notFound" element={<NotFound />} />
            <Route path="usuarios" element={<Users />} />
            <Route path="roles" element={<Rol />} />
            <Route path="especialidades" element={<Speciality />} />
            <Route path="solicitarTurno" element={<SolicitarTurno />}/>
            <Route path="historialTurnos" element={<HistorialTurnos />}/>
          </Route>
          <Route path="/" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
