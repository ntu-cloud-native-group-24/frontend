import BaseLayout from './layout/BaseLayout'
//import LogoutLayout from './layout/LogoutLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { useEffect, useState } from 'react';
import LogoutLayout from './layout/LogoutLayout';

function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    //TODO: checked if the user is already login...
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage login={login} setLogin={setLogin} />} />
        <Route path="/logout" element={<LogoutLayout />} />
        <Route path='/*' element={<BaseLayout login={login} setLogin={setLogin} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
