import './App.css'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  return (
    <>
     <Outlet />
    </>
  )
}

export default App
