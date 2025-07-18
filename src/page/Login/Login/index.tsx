import styles from './styles.module.scss'
import { GoogleBox} from "../../../components";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
export default function Login(){
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken !== undefined) {
      navigate('/teamBuilding');
    }
  }, []);


  return(
      <div className={styles.container}>
        <div className={styles.circle}>
          <div className={styles.main}>
            <h1>Sign up</h1>
           

            <div className={styles.action_low}>
              
				<GoogleBox />
		
              
              <div>
                <span>Already have an account? </span><a href={'/signin'}>Sign in</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.circle_1}></div>
        <div className={styles.circle_2}></div>
      </div>
  )
}