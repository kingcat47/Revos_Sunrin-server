import styles from "./styles.module.scss";
import {ButtonComponent, InputComponent, SvgIcon} from "../../components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LogoIcon from "../../assets/icon/LogoIcon.svg?react"

export default function Signup(){
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Sign up</h1>
          <span>Name</span>
          <InputComponent></InputComponent>
          <span>Password</span>
          <InputComponent></InputComponent>
          <ButtonComponent></ButtonComponent>
          <span>Already have an account?</span><a href={'/sign in'}>Sign in</a>
        </div>
        <div className={styles.right}>
          <SvgIcon icon={<LogoIcon />} color={'#5068A9'} width={100} height={100}></SvgIcon>
          <span>Revos</span>

        </div>
      </div>
    </div>
  );
};
