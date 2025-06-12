import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/SignupPage'
import { Signin } from './pages/SigninPage'
import { Project } from './pages/Project'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App