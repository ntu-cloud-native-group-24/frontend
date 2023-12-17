import BaseLayout from './layout/BaseLayout'
//import LogoutLayout from './layout/LogoutLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { useEffect, useState, createContext } from 'react';
import LogoutLayout from './layout/LogoutLayout';
import { userApi } from './api/user';
import { setToken } from './api/axiosUtility';
import { Spin } from 'antd';
import StorePage from './pages/StorePage';

export const StoreIdContext = createContext<number>(-1);

function App() {

  const [login, setLogin] = useState(false);
  const [spinning, setSpinning] = useState<boolean>(true);
  const [storeId, setStoreId] = useState<number>(localStorage.getItem('storeId') ? parseInt(localStorage.getItem('storeId') || '') : -1);

  useEffect(() => {

    setSpinning(true);
    const checkLogin = async () => {
      const response = await userApi.getCurrentUser();
      if( response && response.status === 200 ){
        setLogin(true);
      } else {
        setToken('');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    // check the validness of token
    if( localStorage.getItem('token') ){
      setToken(localStorage.getItem('token') || '');
      checkLogin();
    } else {
      if( window.location.href.substring(window.location.href.length - 5) !== 'login' ){
        window.location.href = '/login';
      }
    }

    setSpinning(false);
  }, [])

  return (
    <BrowserRouter>
    <StoreIdContext.Provider value={storeId}>
      <Spin spinning={spinning} fullscreen />
        {
          !login ? (
            <Routes>
              <Route path='/login' element={<LoginPage login={login} setLogin={setLogin} />} />
              <Route path='/logout' element={<LogoutLayout />} />
            </Routes>
          ) : (
            <Routes>
              <Route path='/logout' element={<LogoutLayout />} />
              <Route path='/store' element={<StorePage setStoreId={setStoreId} />} />
              <Route path='/*' element={<BaseLayout login={login} setLogin={setLogin} />} />
            </Routes>
          )
        }
    </StoreIdContext.Provider>
    </BrowserRouter>
  )
}

export default App
