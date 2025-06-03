import styles from './App.module.scss'
import {Outlet, useLocation} from 'react-router-dom'
import NavbarComponent from "./components/Navbar";
import { useEffect } from 'react';

function App() {
    const location = useLocation()
    const try_login = location.pathname === '/signin' || location.pathname === '/signup'

    useEffect(() => {
        if (try_login) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [try_login]);

    return (
        <div className={styles.container}>
            {!try_login && <NavbarComponent/>}
            <Outlet />
        </div>
    )
}

export default App
