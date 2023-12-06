import HomepageLayout from "./layout/HomepageLayout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupLayout from "./layout/SignupLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignupLayout />} />
        <Route path='*' element={<HomepageLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
