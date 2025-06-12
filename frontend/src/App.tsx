import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignupPage'
import { Signin } from './pages/SigninPage'
import { Projects } from './pages/Projects'
import { ProjectView } from './pages/ProjectView'
import { NewProject } from './pages/NewProject'
import { EditProject } from './pages/EditProject'
import HomePage from './pages/HomePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/new" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectView />} />
          <Route path="/project/edit/:id" element={<EditProject />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App