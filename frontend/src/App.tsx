import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignupPage'
import { Signin } from './pages/SigninPage'
import { Projects } from './pages/Projects'
import { ProjectView } from './pages/ProjectView'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectView />} />
          <Route path="/" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App