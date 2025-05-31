import styles from './App.module.scss'
import {Outlet, useLocation} from 'react-router-dom'
import NavbarComponent from "./components/Navbar";

function App() {
    const location = useLocation()
    const try_login = location.pathname === '/signin' || location.pathname === '/signup'
  return (
    <div className={styles.container}>
        {!try_login && <NavbarComponent/>}
        <Outlet />
    </div>


  )
}

export default App
