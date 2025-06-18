import styles from './styles.module.scss'
import {ButtonComponent, InputComponent} from "../../../components";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../../utils/axios.ts";
export default function Signin(){
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = async () => {
    try {
      if (id == "" || password == "") {
        alert("채워");
        return;
      }

      const req = await axiosInstance.post("/user/signin", {
        id: id,
        password: password,
      });

      localStorage.setItem("accessToken", req.data.data.accessToken);
      localStorage.setItem("refreshToken", req.data.data.refreshToken);

      navigate("/news");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("응 니 잘 못");
    }
  };
  return(
      <div className={styles.container}>
        <div className={styles.circle}>
          <div className={styles.main}>
            <h1>Sign up</h1>
            <div className={styles.action}>

              <div>
                <span>Name</span>
                <InputComponent placeholder={'Hobin'} value={id} onChange={(e) => {
                  setId(e.target.value);
                }}/>
              </div>

              <div>
                <span>Password</span>
                <InputComponent placeholder={'1899Sunrin!'} type={"password"} value={password} onChange={(e) => {
                  setPassword(e.target.value);}}
                />

              </div>

            </div>

            <div className={styles.action_low}>
              <ButtonComponent text={'Sign up'} onClick={signInUser}/>
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